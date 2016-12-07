#include "netdownload.h"

NetDownloadContext* netdownload_create_context(NetDownloadCallback callback) {
  NetDownloadContext *ctx = malloc(sizeof(NetDownloadContext));

  ctx->length = 0;
  ctx->index = 0;
  ctx->data = NULL;
  ctx->callback = callback;

  return ctx;
}

void netdownload_destroy_context(NetDownloadContext *ctx) {
  if (ctx->data) {
    free(ctx->data);
  }
  free(ctx);
}
//NetDownloadContext *ctx = NULL;
void netdownload_initialize(NetDownloadCallback callback) {
  int retVal;
  int INBOX_SIZE;
  int OUTBOX_SIZE;
  INBOX_SIZE = app_message_inbox_size_maximum()/9;
  OUTBOX_SIZE = app_message_inbox_size_maximum()/9;
  NetDownloadContext *ctx = netdownload_create_context(callback);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "NetDownloadContext = %p", ctx);
  app_message_set_context(ctx);

  app_message_register_inbox_received(netdownload_receive);
  app_message_register_inbox_dropped(netdownload_dropped);
  app_message_register_outbox_sent(netdownload_out_success);
  app_message_register_outbox_failed(netdownload_out_failed);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Max buffer sizes are %d / %d", INBOX_SIZE, OUTBOX_SIZE);
  retVal = app_message_open(INBOX_SIZE, OUTBOX_SIZE);
  if (retVal == APP_MSG_OK) 
    APP_LOG(APP_LOG_LEVEL_INFO, "comms_init() - app_message_open() Success - retVal=%d, inbox_size=%d, outbox_size=%d",retVal,
            INBOX_SIZE,
            OUTBOX_SIZE);
  else if (retVal == APP_MSG_OUT_OF_MEMORY)
    APP_LOG(APP_LOG_LEVEL_ERROR, "comms_init() - app_message_open() **** OUT_OF_MEMORY **** - retVal=%d, max_inbox_size=%d, max_outbox_size=%d",retVal,
            INBOX_SIZE,
            OUTBOX_SIZE);
    else
    APP_LOG(APP_LOG_LEVEL_ERROR, "comms_init() - app_message_open() - retVal=%d, max_inbox_size=%d, max_outbox_size=%d",retVal,
            INBOX_SIZE,
            OUTBOX_SIZE);
    //app_message_open(64, 64);
}

void netdownload_deinitialize() {
  //app_message_set_context(ctx);
  //APP_LOG(APP_LOG_LEVEL_WARNING, "1");
  //netdownload_destroy_context(app_message_get_context());
  //APP_LOG(APP_LOG_LEVEL_WARNING, "2");
  app_message_set_context(NULL);
}

void netdownload_request(char *url) {
  //APP_LOG(APP_LOG_LEVEL_WARNING, "Request %s",url);
  DictionaryIterator *outbox;
  app_message_outbox_begin(&outbox);
  // Tell the javascript how big we want each chunk of data: max possible size - dictionary overhead with one Tuple in it.
  //uint32_t chunk_size = (app_message_inbox_size_maximum()/9) - dict_calc_buffer_size(1);
  uint32_t chunk_size = (app_message_inbox_size_maximum()/9) - dict_calc_buffer_size(1, 0);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "(app_message_inbox_size_maximum()/6) %lu ", (app_message_inbox_size_maximum()/6));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "dict_calc_buffer_size(1) %lu ", dict_calc_buffer_size(1, 0));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "ChunkSize %ld ", chunk_size);
  dict_write_int(outbox, MESSAGE_KEY_NETDL_CHUNK_SIZE, &chunk_size, sizeof(uint32_t), false);
  // Send the URL
  dict_write_cstring(outbox, MESSAGE_KEY_NETDL_URL, url);

  app_message_outbox_send();
}

void netdownload_destroy(NetDownload *image) {
  // We malloc'd that memory before creating the GBitmap
  // We are responsible for freeing it.
  if (image) {
    free(image->data);
    free(image);
  }
}

void netdownload_receive(DictionaryIterator *iter, void *context) {
  if(js_is_ready==1){
  NetDownloadContext *ctx = (NetDownloadContext*) context;
  //APP_LOG(APP_LOG_LEVEL_WARNING, "Receiving Data.");
  Tuple *tuple = dict_read_first(iter);
  if (!tuple) {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Got a message with no first key! Size of message: %li", (uint32_t)iter->end - (uint32_t)iter->dictionary);
    return;
  }
  Tuple *netdl_data = dict_find(iter, MESSAGE_KEY_NETDL_DATA);
  if(netdl_data){
    if (ctx->index + netdl_data->length <= ctx->length) {
      memcpy(ctx->data + ctx->index, netdl_data->value->data, netdl_data->length);
      ctx->index += netdl_data->length;
      //APP_LOG(APP_LOG_LEVEL_DEBUG, "Getting Data. Size=%u", tuple->length);
 // APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
    }
    else {
      APP_LOG(APP_LOG_LEVEL_WARNING, "Not overriding rx buffer. Bufsize=%li BufIndex=%li DataLen=%i",
              ctx->length, ctx->index, netdl_data->length);
    }
  }
  Tuple *netdl_begin = dict_find(iter, MESSAGE_KEY_NETDL_BEGIN);
  if(netdl_begin){
    APP_LOG(APP_LOG_LEVEL_DEBUG, "Start transmission. Size=%lu", netdl_begin->value->uint32);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
    if (ctx->data != NULL) {
      free(ctx->data);
    }
    ctx->data = malloc(netdl_begin->value->uint32);
    if (ctx->data != NULL) {
      ctx->length = netdl_begin->value->uint32;
      ctx->index = 0;
    }
    else {
      APP_LOG(APP_LOG_LEVEL_WARNING, "Unable to allocate memory to receive image.");
      ctx->length = 0;
      ctx->index = 0;
    }
  }
  Tuple *netdl_end = dict_find(iter, MESSAGE_KEY_NETDL_END);
  if(netdl_end){
    if (ctx->data && ctx->length > 0 && ctx->index > 0) {
      NetDownload *image = malloc(sizeof(NetDownload));
      image->data = ctx->data;
      image->length = ctx->length;

      printf("Received file of size=%lu and address=%p", ctx->length, ctx->data);
      ctx->callback(image);

      // We have transfered ownership of this memory to the app. Make sure we dont free it.
      // (see netdownload_destroy for cleanup)
      ctx->data = NULL;
      ctx->index = ctx->length = 0;
    }
    else {
      APP_LOG(APP_LOG_LEVEL_DEBUG, "Got End message but we have no image...");
    }
  }
 }
  Tuple *mk_ready = dict_find(iter, MESSAGE_KEY_ready);
  if(mk_ready){
    app_timer_cancel(timer);
    js_is_ready = 1;
    show_next_image();
    firstrun = 0;
    APP_LOG(APP_LOG_LEVEL_DEBUG, "JS is Ready, continue!");
  }

}

char *translate_error(AppMessageResult result) {
  switch (result) {
    case APP_MSG_OK: return "APP_MSG_OK";
    case APP_MSG_SEND_TIMEOUT: return "APP_MSG_SEND_TIMEOUT";
    case APP_MSG_SEND_REJECTED: return "APP_MSG_SEND_REJECTED";
    case APP_MSG_NOT_CONNECTED: return "APP_MSG_NOT_CONNECTED";
    case APP_MSG_APP_NOT_RUNNING: return "APP_MSG_APP_NOT_RUNNING";
    case APP_MSG_INVALID_ARGS: return "APP_MSG_INVALID_ARGS";
    case APP_MSG_BUSY: return "APP_MSG_BUSY";
    case APP_MSG_BUFFER_OVERFLOW: return "APP_MSG_BUFFER_OVERFLOW";
    case APP_MSG_ALREADY_RELEASED: return "APP_MSG_ALREADY_RELEASED";
    case APP_MSG_CALLBACK_ALREADY_REGISTERED: return "APP_MSG_CALLBACK_ALREADY_REGISTERED";
    case APP_MSG_CALLBACK_NOT_REGISTERED: return "APP_MSG_CALLBACK_NOT_REGISTERED";
    case APP_MSG_OUT_OF_MEMORY: return "APP_MSG_OUT_OF_MEMORY";
    case APP_MSG_CLOSED: return "APP_MSG_CLOSED";
    case APP_MSG_INTERNAL_ERROR: return "APP_MSG_INTERNAL_ERROR";
    default: return "UNKNOWN ERROR";
  }
}

void netdownload_dropped(AppMessageResult reason, void *context) {
  APP_LOG(APP_LOG_LEVEL_ERROR, "Dropped message! Reason given: %s", translate_error(reason));
}

void netdownload_out_success(DictionaryIterator *iter, void *context) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Message sent.");
}

//static void change_updater(void);
/*
void netdownload_out_failed(DictionaryIterator *iter, AppMessageResult reason, void *context) {
  //change_updater(); //Wir müssen dem Program sagen es soll irgendwie weitermachen und das hier killen.
  if(failcounter<=5){
    netdownload_request("dummyurl");
    failcounter += 1;
  }
  else{
    APP_LOG(APP_LOG_LEVEL_DEBUG, "Failed to send message. Reason = %s", translate_error(reason));
  }
}*/
