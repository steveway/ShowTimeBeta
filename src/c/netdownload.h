#include <pebble.h>

/* The key used to transmit download data. Contains byte array. */
#define NETDL_DATA// 0x696d6700 
/* The key used to start a new image transmission. Contains uint32 size */
#define NETDL_BEGIN// NETDL_DATA + 1
/* The key used to finalize an image transmission. Data not defined. */
#define NETDL_END// NETDL_DATA + 2

/* The key used to tell the JS how big chunks should be */
#define NETDL_CHUNK_SIZE// NETDL_DATA + 3
/* The key used to request a PBI */
#define NETDL_URL// NETDL_DATA + 4
#ifndef JS_IS_READY_INC
#define JS_IS_READY_INC
uint8_t js_is_ready;
uint8_t firstrun;
AppTimer *timer;
void show_next_image(void);
#endif
typedef struct {
  /* We keep a pointer to the data so we can free it later. */
  uint8_t*  data;
  /* Length of data */
  uint32_t length;
} NetDownload;

typedef void (*NetDownloadCallback)(NetDownload *image);
char *translate_error(AppMessageResult result);
typedef struct {
  /* size of the data buffer allocated */
  uint32_t length;
  /* buffer of data that will contain the actual data */
  uint8_t *data;
  /* Next byte to write */
  uint32_t index;
  /* Callback to call when we are done loading the data */
  NetDownloadCallback callback;
} NetDownloadContext;

NetDownloadContext* netdownload_create_context(NetDownloadCallback callback);

void netdownload_initialize();
void netdownload_deinitialize();

void netdownload_request(char *url);
void netdownload_destroy_context(NetDownloadContext *ctx);
// Call this when you are done using an image to properly free memory.
void netdownload_destroy(NetDownload *image);

void netdownload_receive(DictionaryIterator *iter, void *context);
void netdownload_dropped(AppMessageResult reason, void *context);
void netdownload_out_success(DictionaryIterator *iter, void *context);
void netdownload_out_failed(DictionaryIterator *iter, AppMessageResult reason, void *context);


