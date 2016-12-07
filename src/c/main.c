#include "pebble.h"
#include "effect_layer.h"
#include "netdownload.h"
#include <math.h>
#include "indicators.h"
//#include "png.h"
//#include "FrameFX.h"
#include <ctype.h>
//ISFACE definieren wenn wir ein Watchface draus machen wollen
#define ISFACE
//#include "mini-printf.h"
#define INVERTL
static Window *window;
Layer *window_layer;
// static TextLayer *temperature_layer;
/*
static TextLayer *city_layer;
static BitmapLayer *icon_layer;
static GBitmap *icon_bitmap = NULL;
*/
#define SHOWWORKER
#define ROTATEIT
//RotBitmapLayer *testrotlayer;

//static GBitmap *s_res_turbopebble;
//static BitmapLayer *turbolayer;
uint8_t failcounter = 0;
uint8_t twimagecreated = 0;
// static GBitmap *s_res_10p;
// static GBitmap *s_res_20p;
// static GBitmap *s_res_30p;
// static GBitmap *s_res_40p;
// static GBitmap *s_res_50p;
// static GBitmap *s_res_60p;
// static GBitmap *s_res_70p;
// static GBitmap *s_res_80p;
// static GBitmap *s_res_90p;
// static GBitmap *s_res_100p;
// static GBitmap *s_res_charging;
// static GBitmap *s_res_charfull;
#ifdef SHOWWORKER
static GBitmap *s_res_bwork;
static GBitmap *s_res_bwork_inv;
#endif
static GBitmap *twdefault;
// static BitmapLayer *battery_layer;
#ifdef SHOWWORKER
static BitmapLayer *worker_layer;
#endif
#define USE_SDK4
static TextLayer *status_layer;
static TextLayer *twtext_layer;
static TextLayer *interval_layer;
Layer *twtext_layer_layer;
static TextLayer *twdate_layer;
TextLayer *text_date_layer;
TextLayer *text_time_layer;
TextLayer *text_showtime_layer;
static TextLayer *s_num_label;
//TextLayer *text_battery_layer;
#ifdef INVERTL
static InverterLayer *bluetooth_layer;
static InverterLayer *invert_all1;
static InverterLayer *invert_all2;
#endif
uint8_t rotate_screen = 0;
#ifdef ROTATEIT
static EffectLayer *rotate_layer;
static EffectLayer *mirror_layer;
#endif
// static EffectLayer* test_effect_layer;
//InverterLayer *inverter_layer;
time_t showtime;
//struct tm *show_tick_time;
static GFont s_res_vgafont40;
static GSize Temp;
int32_t showoffset;
#ifdef FONTTEST
GColor font_color; 
#endif
uint8_t updateinterval = 60;
static AppSync sync;
static uint8_t sync_buffer[400];
//static char battery_text[] = "100%";
static char date_text[] = "December 24  ";
static char temptwtext[] = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.";
static char interval_text[] = "100M";
uint8_t laststatus;
uint8_t firststart;
char buf[200];
static BitmapLayer *bitmap_layer;
static GBitmap *current_bmp;
uint8_t waitfordl = 1;
uint8_t oldfreed = 0;
uint32_t brightness = 0;
static GFont s_font;
// #define  MESSAGE_KEY_SHOW_STATUS
// #define  MESSAGE_KEY_SHOW_TWTEXT 
// #define  MESSAGE_KEY_SHOW_TWDATE 
// #define  MESSAGE_KEY_SHOW_OFFSET 
// #define  MESSAGE_KEY_SHOW_UPDATE 
// #define  MESSAGE_KEY_BG_COLOR    


// enum ShowInfo {
//   MESSAGE_KEY_SHOW_STATUS = 0x0,         // TUPLE_INT
//   MESSAGE_KEY_SHOW_TWTEXT = 0x1,  // TUPLE_CSTRING
//   MESSAGE_KEY_SHOW_TWDATE = 0x2,         // TUPLE_CSTRING
//   MESSAGE_KEY_SHOW_OFFSET = 0x3,
//   MESSAGE_KEY_SHOW_UPDATE = 0x4,
//   MESSAGE_KEY_BG_COLOR    = 0x5,
// };

//#ifndef PBL_SDK_2
//#ifdef ROTATEIT
// static void app_focus_changed(bool focused) {
//   if (focused) { // on resuming focus - restore background
//     layer_mark_dirty(effect_layer_get_layer(rotate_layer));
//   }
// }
//#endif
//#endif
//static unsigned long image = 0;
static void health_handler(HealthEventType event, void *context) {
  static char s_value_buffer[8];
  if (event == HealthEventMovementUpdate) {
    // display the step count
    snprintf(s_value_buffer, sizeof(s_value_buffer), "%d", (int)health_service_sum_today(HealthMetricStepCount));
    text_layer_set_text(s_num_label, s_value_buffer);
  }
}
void show_next_image() {
  //psleep(2000);
  /*uint8_t i;
  uint8_t chunknumber = 0;
  uint8_t datasize = 0;
  */
  // show that we are loading by showing no image
  //APP_LOG(APP_LOG_LEVEL_DEBUG, "Hier2");
  bitmap_layer_set_bitmap(bitmap_layer, NULL); 
  //text_layer_set_text(text_layer, "Loading...");
  //APP_LOG(APP_LOG_LEVEL_DEBUG, "Hier3");
  // Unload the current image if we had one and save a pointer to this one
  if (current_bmp) {
    gbitmap_destroy(current_bmp);
    current_bmp = NULL;
  }

  /*for(i=0; i<(4096/PERSIST_DATA_MAX_LENGTH);i++){
    if(persist_exists(i)){
      chunknumber++;
      datasize += persist_get_size(i);
    }
  }
  for(i=0; i<(4096/PERSIST_DATA_MAX_LENGTH);i++){
    if(persist_exists(i)){
      persist_read_data(i, void * buffer,persist_get_size(i))
    }
  }
  */

  //APP_LOG(APP_LOG_LEVEL_DEBUG, "Hier4");
  #ifdef PBL_COLOR
  #ifdef PBL_PLATFORM_BASALT
  netdownload_request("color_basalt");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "color_basalt");
  #else
  netdownload_request("color");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "color");
  #endif
  #else
  if(watch_info_get_firmware_version().major >= 3){
    //#ifdef PBL_PLATFORM_BASALT
    netdownload_request("bw_basalt");
    APP_LOG(APP_LOG_LEVEL_DEBUG, "bw_basalt");
  }
  else{
    //#else
    netdownload_request("bw");
    APP_LOG(APP_LOG_LEVEL_DEBUG, "bw");
  }
  //#endif
  #endif

}
static void change_updater(void);

void timer_callback(void *data) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Nothing happened in a minute, we'll run anyway!");
  app_timer_cancel(timer);
  js_is_ready = 1;
  show_next_image();
  firstrun = 0;
}

void download_complete_handler(NetDownload *download) {
  /*uint8_t chunknumber;
  uint8_t i;
  uint32_t tempsize;*/
  //printf("Loaded image with %lu bytes", download->length);
  //printf("Heap free is %u bytes", heap_bytes_free());
  //APP_LOG(APP_LOG_LEVEL_DEBUG, "Hier5");
  //GBitmap *bmp = gbitmap_create_with_png_data(download->data, download->length);
  #ifdef PBL_PLATFORM_BASALT
  GBitmap *bmp = gbitmap_create_from_png_data(download->data, download->length);
  #else
  GBitmap *bmp = gbitmap_create_from_png_data(download->data, download->length);
  //GBitmap *bmp = gbitmap_create_with_png_data(download->data, download->length);
  #endif
  /*
  if(download->length < 4096){
    chunknumber = ((int)download->length / (int)PERSIST_DATA_MAX_LENGTH)+1;
    //unusedchunks = (4096 / (int)PERSIST_DATA_MAX_LENGTH)-chunknumber;
    for(i=(4096 / (int)PERSIST_DATA_MAX_LENGTH);i>chunknumber; i--){
      persist_delete(i);
    }
    for(i=0;i<=chunknumber;i++){
      //fill storage with (int)PERSIST_DATA_MAX_LENGTH number of bytes from download->data
      if(i==chunknumber){
        tempsize = (chunknumber*PERSIST_DATA_MAX_LENGTH) - (PERSIST_DATA_MAX_LENGTH * (chunknumber - 1));
      }
      else{
        tempsize = PERSIST_DATA_MAX_LENGTH;
      }
      APP_LOG(APP_LOG_LEVEL_INFO, "Writing Chunk: %i with size: %ld",i,tempsize);
      persist_write_data(i,&download->data[i*(int)PERSIST_DATA_MAX_LENGTH],tempsize);

    }
  }
  APP_LOG(APP_LOG_LEVEL_INFO, "ImageSize: %ld", download->length);
  */
  bitmap_layer_set_bitmap(bitmap_layer, bmp);

  // Save pointer to currently shown bitmap (to free it)
  if (current_bmp) {
    gbitmap_destroy(current_bmp);
  }
  current_bmp = bmp;

  // Free the memory now
  // gbitmap_create_with_png_data will free download->data
  // We null it out now to avoid a double free
  download->data = NULL;
  //text_layer_set_text(text_layer, "");
  netdownload_destroy(download);
  waitfordl = 0;
  twimagecreated = 1;
  change_updater();
}

static void sync_error_callback(AppMessageResult app_message_error, void *context) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "In dropped: %i - %s", app_message_error, translate_error(app_message_error));
  //APP_LOG(APP_LOG_LEVEL_DEBUG, "App Message Sync Error: %d", app_message_error);
}
static void updatetwit(void);
#ifdef FONTTEST
static void change_font_color(Layer *layer, GContext *ctx) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Setting Font Color");
  graphics_context_set_text_color(ctx, font_color);
}
#endif
void handle_minute_tick(struct tm *tick_time, TimeUnits units_changed) {
  // Need to be static because they're used by the system later.
  struct tm *show_tick_time;
  static char time_text[] = "00:00  ";
  static char show_time_text[] = "00:00  ";
  //static char date_text[] = "xxxxxxxxx 00";
  if(((time(NULL)/60)%updateinterval)==0){
    //APP_LOG(APP_LOG_LEVEL_DEBUG, "Updated!");
    updatetwit();
  }
  //if ((units_changed & HOUR_UNIT) != 0) {
  //  updatetwit();
  //}

  char *time_format;

  //show_tick_time.tm_sec = time(NULL).tm_sec + showoffset;
  if (!tick_time) {
    time_t now = time(NULL);
    tick_time = localtime(&now);
  }

  //time_t now = time(NULL);
  //struct tm now_tm = *localtime( &now);
  //struct tm show_tick_time = now_tm;
  //show_tick_time = localtime( &now);
  //show_tick_time.tm_sec += showoffset;
  //showtime = now + showoffset;
  //show_tick_time = localtime(&showtime);
  //show_tick_time.tm_sec += showoffset;
  //app_log(APP_LOG_LEVEL_DEBUG_VERBOSE,"weather.c",94,"s");
  //showtime = mktime(&show_tick_time);
  // TODO: Only update the date when it's changed.

  strftime(date_text, sizeof(date_text), "%B %e %a", tick_time);
  //date_text[0]+=32; //We only want lowercase on this Font
  text_layer_set_text(text_date_layer, date_text);


  if (clock_is_24h_style()) {
    time_format = "%R";
  } else {
    time_format = "%I:%M";
  }

  strftime(time_text, sizeof(time_text), time_format, tick_time);



  time_t now2 = time(NULL);
  showtime = now2 + showoffset;
  show_tick_time = localtime(&showtime);
  if(!clock_is_24h_style()){
    strftime(show_time_text, sizeof(show_time_text), "%I:%M%p", show_tick_time);
  }
  else{
    strftime(show_time_text, sizeof(show_time_text), time_format, show_tick_time);
  }

  // Kludge to handle lack of non-padded hour format string
  // for twelve hour clock.
  if (!clock_is_24h_style() && (time_text[0] == '0')) {
    memmove(time_text, &time_text[1], sizeof(time_text) - 1);
    memmove(show_time_text, &show_time_text[1], sizeof(show_time_text)-1);
  }
  for (int i=0; time_text[i]; i++){
    time_text[i] = tolower((unsigned char)time_text[i]);
  }
  //time_text[5] = tolower(time_text[5]);

  //for(int i = 0; time_text[i]; i++){
  //time_text[i] = tolower(time_text[i]);
  //}
  text_layer_set_text(text_time_layer, time_text);
  text_layer_set_text(text_showtime_layer,show_time_text);
  #ifdef SHOWWORKER
  //layer_set_hidden(bitmap_layer_get_layer(worker_layer), !app_worker_is_running());
  #endif
  //         if(firstrun == 1){
  //           //Test a few times in a row
  //           for(int i=0;i<=5;i++){
  //             psleep(1000);
  //             if(js_is_ready == 1){
  //               show_next_image();
  //               firstrun = 0;
  //               break;
  //             }

  //           }
  //     }

}


static void sync_tuple_changed_callback(DictionaryIterator *iter, void *context) {
  //static void sync_tuple_changed_callback(const uint32_t key, const Tuple* new_tuple, const Tuple* old_tuple, void* context) {


  Tuple *show_status = dict_find(iter, MESSAGE_KEY_status);
  if(show_status){
    switch(show_status->value->uint8){
      case 0:
      if(laststatus != 0){
        vibes_short_pulse();
      }
      //text_layer_set_text(status_layer, "Live \u25CF");
      text_layer_set_text(status_layer, ")");
      // text_layer_set_text(statsym_layer, "\xe2\x96\xb6"); //▶
      laststatus = 0;
      break;
      case 1:
      text_layer_set_text(status_layer,"\"");
      // text_layer_set_text(statsym_layer, "\xe2\x96\xb7");//▷
      laststatus = 1;
      break;
      case 2:
      text_layer_set_text(status_layer, "\"");
      //text_layer_set_text(statsym_layer, "\xe2\x96\xb7");//▷
      laststatus = 2;
      break;
      case 3:
      text_layer_set_text(status_layer, "\"");
      //text_layer_set_text(statsym_layer, "\xe2\x96\xb7");//▷
      laststatus = 3;
      break;
    }
  }

  Tuple *show_twtext = dict_find(iter, MESSAGE_KEY_twtext);
  if(show_twtext){
    if(strlen(show_twtext->value->cstring)>=5){
      //if(strcmp(new_tuple->value->cstring,"")!=0){
      //if(new_tuple->value->cstring != NULL){
      strcpy(temptwtext, show_twtext->value->cstring);
      #ifdef PBL_PLATFORM_EMERY
      Temp = graphics_text_layout_get_content_size(temptwtext,fonts_get_system_font(FONT_KEY_GOTHIC_18),layer_get_bounds(text_layer_get_layer(twtext_layer)),GTextOverflowModeWordWrap,GTextAlignmentCenter);
      #else
      Temp = graphics_text_layout_get_content_size(temptwtext,fonts_get_system_font(FONT_KEY_GOTHIC_14),layer_get_bounds(text_layer_get_layer(twtext_layer)),GTextOverflowModeWordWrap,GTextAlignmentCenter);
      #endif
      twtext_layer_layer = text_layer_get_layer(twtext_layer);

      layer_set_frame(twtext_layer_layer, GRect(0, ((48+18)+layer_get_bounds(text_layer_get_layer(twtext_layer)).size.h/2)-(Temp.h/2), layer_get_bounds(window_layer).size.w, layer_get_bounds(text_layer_get_layer(twtext_layer)).size.h));

      text_layer_set_text(twtext_layer, temptwtext);
      //}
      //if(new_tuple->value->cstring != NULL){
      //  text_layer_set_text(twtext_layer, new_tuple->value->cstring);
    }
  }
  Tuple *show_twdate = dict_find(iter, MESSAGE_KEY_twdate);
  if(show_twdate){
    text_layer_set_text(twdate_layer,show_twdate->value->cstring);
  }
  Tuple *show_offset = dict_find(iter, MESSAGE_KEY_offset);
  if(show_offset){
    showoffset = show_offset->value->int32;
    //APP_LOG(APP_LOG_LEVEL_DEBUG, "Offset: %ld", showoffset);
  }
  Tuple *show_update = dict_find(iter, MESSAGE_KEY_updateinterval);
  if(show_update){

    updateinterval = show_update->value->uint8;
    //APP_LOG(APP_LOG_LEVEL_DEBUG, "Updateinterval: %d", updateinterval);
    snprintf(interval_text, sizeof(interval_text), "%dM", updateinterval);
    text_layer_set_text(interval_layer, interval_text);
  }
  Tuple *screen_rotate = dict_find(iter, MESSAGE_KEY_rotate);
  #ifdef ROTATEIT
  if(screen_rotate){

    rotate_screen = screen_rotate->value->int32;
    APP_LOG(APP_LOG_LEVEL_DEBUG, "RotateState: %ld", screen_rotate->value->int32);
    if(screen_rotate->value->int32 == 0){ //normal
      layer_set_hidden(effect_layer_get_layer(rotate_layer), true);
      layer_set_hidden(text_layer_get_layer(interval_layer),false);
      layer_set_hidden(text_layer_get_layer(twdate_layer),false);
      layer_set_hidden(effect_layer_get_layer(mirror_layer), true);
    }
    else if(screen_rotate->value->int32 == 90){ //right
      effect_layer_remove_effect(rotate_layer);
      effect_layer_add_effect(rotate_layer, effect_rotate_90_degrees, (void *)true);
      layer_set_hidden(effect_layer_get_layer(rotate_layer), false);
      layer_set_hidden(text_layer_get_layer(interval_layer),true);
      layer_set_hidden(text_layer_get_layer(twdate_layer),true);
      layer_set_hidden(effect_layer_get_layer(mirror_layer), true);
    }
    else if(screen_rotate->value->int32 == 270){ //left
      effect_layer_remove_effect(rotate_layer);
      effect_layer_add_effect(rotate_layer, effect_rotate_90_degrees, (void *)false);
      layer_set_hidden(effect_layer_get_layer(rotate_layer), false);
      layer_set_hidden(text_layer_get_layer(interval_layer),true);
      layer_set_hidden(text_layer_get_layer(twdate_layer),true);
      layer_set_hidden(effect_layer_get_layer(mirror_layer), true);
    }
    else{ //upside down
      //effect_layer_remove_effect(rotate_layer);
      //effect_layer_add_effect(rotate_layer, effect_mirror_vertical, NULL);
      layer_set_hidden(effect_layer_get_layer(rotate_layer), true);
      layer_set_hidden(text_layer_get_layer(interval_layer),false);
      layer_set_hidden(text_layer_get_layer(twdate_layer),false);
      layer_set_hidden(effect_layer_get_layer(mirror_layer), false);
    }

  }
  #endif
  Tuple *bg_color = dict_find(iter, MESSAGE_KEY_bgcolor);
  if(bg_color){

    #ifdef PBL_COLOR
    window_set_background_color(window,GColorFromHEX(bg_color->value->int32));
    text_layer_set_text_color(twtext_layer,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));
    text_layer_set_text_color(status_layer,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));
    text_layer_set_text_color(twdate_layer,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));
    text_layer_set_text_color(interval_layer,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));
    text_layer_set_text_color(text_showtime_layer,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));
    text_layer_set_text_color(text_date_layer,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));
    text_layer_set_text_color(text_time_layer,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));
    text_layer_set_text_color(s_num_label,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)));

    if(gcolor_equal(GColorBlack,gcolor_legible_over(GColorFromHEX(bg_color->value->int32)))){
      bitmap_layer_set_bitmap(worker_layer, s_res_bwork_inv);
    }
    else{
      bitmap_layer_set_bitmap(worker_layer, s_res_bwork);
    }

    //           bitmap_layer_set_background_color(battery_layer, GColorFromHEX(new_tuple->value->int32));
    //           bitmap_layer_set_compositing_mode(battery_layer,GCompOpSet);


    APP_LOG(APP_LOG_LEVEL_DEBUG, "Color: %ld", bg_color->value->int32);
    #else
    if(bg_color->value->int32!=0){
      #ifdef INVERTL
      layer_set_hidden(inverter_layer_get_layer(invert_all1), false);
      layer_set_hidden(inverter_layer_get_layer(invert_all2), false);
      #endif
    }
    else{
      #ifdef INVERTL
      layer_set_hidden(inverter_layer_get_layer(invert_all1), true);
      layer_set_hidden(inverter_layer_get_layer(invert_all2), true);
      #endif
    }
    window_set_background_color(window,GColorBlack);
    //APP_LOG(APP_LOG_LEVEL_DEBUG, "Color: %ld", bg_color->value->int32);
    #endif
  }


}


static void send_cmd(void) {
  Tuplet value = TupletInteger(1, 1);

  DictionaryIterator *iter;
  app_message_outbox_begin(&iter);

  if (iter == NULL) {
    return;
  }

  dict_write_tuplet(iter, &value);
  dict_write_end(iter);

  app_message_outbox_send();
}

#ifdef USE_SDK4
 GRect originaltwtextbounds;
static void prv_unobstructed_will_change(AnimationProgress progress, void *context) {
  if(rotate_screen == 0){
  // Get the full size of the screen
  GRect full_bounds = layer_get_unobstructed_bounds(window_get_root_layer(window));
   
//  uint32_t tempx;
  uint32_t pushup;
    pushup = layer_get_bounds(window_get_root_layer(window)).size.h-layer_get_unobstructed_bounds(window_get_root_layer(window)).size.h;
    GRect newtwtextbounds = GRect(originaltwtextbounds.origin.x, originaltwtextbounds.origin.y, originaltwtextbounds.size.w, originaltwtextbounds.size.h-pushup);
  //text_layer_set_size(twtext_layer,GRect(0,69,full_bounds.size.w, full_bounds.size.h - 100));
  //full_bounds.size.h
          #ifdef PBL_PLATFORM_EMERY
      Temp = graphics_text_layout_get_content_size(temptwtext,fonts_get_system_font(FONT_KEY_GOTHIC_18),newtwtextbounds,GTextOverflowModeWordWrap,GTextAlignmentCenter);
      #else
      Temp = graphics_text_layout_get_content_size(temptwtext,fonts_get_system_font(FONT_KEY_GOTHIC_14),newtwtextbounds,GTextOverflowModeWordWrap,GTextAlignmentCenter);
      #endif
  //Temp = graphics_text_layout_get_content_size(temptwtext,fonts_get_system_font(FONT_KEY_GOTHIC_14),GRect(0,69,full_bounds.size.w, full_bounds.size.h - 78),GTextOverflowModeWordWrap,GTextAlignmentCenter);
  twtext_layer_layer = text_layer_get_layer(twtext_layer);
 /* if((full_bounds.size.h-54)-(Temp.h/2) < 69){
    tempx = 69;
  }
  else{
    tempx = (full_bounds.size.h-54)-(Temp.h/2);
  }*/
  layer_set_frame(twtext_layer_layer, GRect(0, ((48+18)+layer_get_bounds(text_layer_get_layer(twtext_layer)).size.h/2)-(Temp.h/2), full_bounds.size.w, newtwtextbounds.size.h));
  //layer_set_frame(twtext_layer_layer, GRect(0, tempx, full_bounds.size.w, full_bounds.size.h - (69+15)));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Temp.h/2: %d \npushup: %lu", newtwtextbounds.size.h, pushup);
  text_layer_set_text(twtext_layer, temptwtext);
  
  //layer_set_hidden(text_layer_get_layer(twtext_layer),true);
  layer_mark_dirty(text_layer_get_layer(twtext_layer));
  }
}

#endif

static void window_load(Window *window) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!A");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  window_layer = window_get_root_layer(window);
  s_res_vgafont40 = fonts_load_custom_font(resource_get_handle(RESOURCE_ID_vgafont40));
  s_font = fonts_load_custom_font(resource_get_handle(RESOURCE_ID_unicons_14));
  #ifdef USE_SDK4
  GRect unobstructed_bounds = layer_get_unobstructed_bounds(window_layer);
  #endif
  uint8_t statusbar_h = 18;
  status_layer = text_layer_create(GRect(2, 0, layer_get_bounds(window_layer).size.w, statusbar_h));
  text_layer_set_text_color(status_layer, GColorWhite);
  text_layer_set_background_color(status_layer, GColorClear);
  text_layer_set_font(status_layer, s_font);
  text_layer_set_text_alignment(status_layer, GTextAlignmentLeft);
  layer_add_child(window_layer, text_layer_get_layer(status_layer));

  twtext_layer = text_layer_create(GRect(0, (statusbar_h+48), layer_get_bounds(window_layer).size.w, layer_get_bounds(window_layer).size.h -(statusbar_h+48+statusbar_h))); //69 78
  text_layer_set_text_color(twtext_layer, GColorWhite);
  text_layer_set_background_color(twtext_layer, GColorClear);
  #ifdef PBL_PLATFORM_EMERY
  text_layer_set_font(twtext_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18));
  #else
  text_layer_set_font(twtext_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14));
  #endif
  text_layer_set_text_alignment(twtext_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(twtext_layer));
  originaltwtextbounds = GRect(0, (statusbar_h+48), layer_get_bounds(window_layer).size.w, layer_get_bounds(window_layer).size.h -(statusbar_h+48+statusbar_h));

  twdate_layer = text_layer_create(GRect(3, layer_get_bounds(window_layer).size.h -15, layer_get_bounds(window_layer).size.w-2, 14));
  text_layer_set_text_color(twdate_layer, GColorWhite);
  text_layer_set_background_color(twdate_layer, GColorClear);
  text_layer_set_font(twdate_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14));
  text_layer_set_text_alignment(twdate_layer, GTextAlignmentLeft);
  layer_add_child(window_layer, text_layer_get_layer(twdate_layer));


  text_date_layer = text_layer_create(GRect(0, 0, layer_get_bounds(window_layer).size.w, statusbar_h));
  text_layer_set_text_color(text_date_layer, GColorWhite);
  text_layer_set_background_color(text_date_layer, GColorClear);
  text_layer_set_font(text_date_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14));
  text_layer_set_text_alignment(text_date_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(text_date_layer));
  #ifdef ROTATEIT
  text_time_layer = text_layer_create(GRect(1, 15, layer_get_bounds(window_layer).size.w, 40));
  #else
  text_time_layer = text_layer_create(GRect(0, 15, layer_get_bounds(window_layer).size.w, 40));
  #endif
  text_layer_set_text_color(text_time_layer, GColorWhite);
  text_layer_set_background_color(text_time_layer, GColorClear);
  text_layer_set_font(text_time_layer, s_res_vgafont40);
  text_layer_set_text_alignment(text_time_layer, GTextAlignmentLeft);
  layer_add_child(window_layer, text_layer_get_layer(text_time_layer));

  text_showtime_layer = text_layer_create(GRect(0, 54, layer_get_bounds(window_layer).size.w, 14));
  text_layer_set_text_color(text_showtime_layer, GColorWhite);
  text_layer_set_background_color(text_showtime_layer, GColorClear);
  text_layer_set_font(text_showtime_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14));
  text_layer_set_text_alignment(text_showtime_layer, GTextAlignmentLeft);
  layer_add_child(window_layer, text_layer_get_layer(text_showtime_layer));

  s_num_label = text_layer_create(GRect(52, 54, 58, 14));
  text_layer_set_background_color(s_num_label, GColorClear);
  text_layer_set_text_color(s_num_label, GColorWhite);
  text_layer_set_font(s_num_label, fonts_get_system_font(FONT_KEY_GOTHIC_14));
  layer_add_child(window_layer, text_layer_get_layer(s_num_label));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!B");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  // subscribe to health events
  if(health_service_events_subscribe(health_handler, NULL)) {
    // force initial steps display
    health_handler(HealthEventMovementUpdate, NULL);
    #ifdef SHOWWORKER
    s_res_bwork = gbitmap_create_with_resource(RESOURCE_ID_bwork);
    s_res_bwork_inv = gbitmap_create_with_resource(RESOURCE_ID_bwork_inv);
    worker_layer = bitmap_layer_create(GRect(44, 60, 6, 8));
    bitmap_layer_set_bitmap(worker_layer, s_res_bwork);
    layer_add_child(window_layer, bitmap_layer_get_layer(worker_layer));
    bitmap_layer_set_compositing_mode(worker_layer,GCompOpSet);
    //layer_set_hidden(bitmap_layer_get_layer(worker_layer), !app_worker_is_running());
    #endif
  } else {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Health not available!");
  }
APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!C");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  interval_layer = text_layer_create(GRect(0, layer_get_bounds(window_layer).size.h-15, layer_get_bounds(window_layer).size.w-3, 14));
  text_layer_set_text_color(interval_layer, GColorWhite);
  text_layer_set_background_color(interval_layer, GColorClear);
  text_layer_set_font(interval_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14));
  text_layer_set_text_alignment(interval_layer, GTextAlignmentRight);
  layer_add_child(window_layer, text_layer_get_layer(interval_layer));

APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!D");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  #ifdef INVERTL
  bluetooth_layer = inverter_layer_create(GRect(0, 0, layer_get_bounds(window_layer).size.w, 19));
  layer_add_child(window_layer, inverter_layer_get_layer(bluetooth_layer));
  layer_set_hidden(inverter_layer_get_layer(bluetooth_layer), true);

  invert_all2 = inverter_layer_create(GRect(layer_get_bounds(window_layer).size.w-50, 19, 50, 50));
  layer_add_child(window_layer, inverter_layer_get_layer(invert_all2));
  layer_set_hidden(inverter_layer_get_layer(invert_all2), true);
  invert_all1 = inverter_layer_create(layer_get_bounds(window_layer));
  layer_add_child(window_layer, inverter_layer_get_layer(invert_all1));
  layer_set_hidden(inverter_layer_get_layer(invert_all1), true);
  #endif
  //GRect bounds = layer_get_bounds(window_layer);
  //APP_LOG(APP_LOG_LEVEL_DEBUG, "layer");
  bitmap_layer = bitmap_layer_create(GRect(layer_get_bounds(window_layer).size.w-49, 20, 48, 48));
  layer_add_child(window_layer, bitmap_layer_get_layer(bitmap_layer));
  current_bmp = NULL;
  //   test_effect_layer = effect_layer_create(GRect(0, 0, 144, 168));
  //   effect_layer_add_effect(test_effect_layer, effect_invert, NULL); //effect_rotate_90_degrees
  //   layer_add_child(window_layer, effect_layer_get_layer(test_effect_layer));
  //text_layer_set_text(interval_layer, interval_text);
  #ifdef FONTTEST
  font_color = GColorWhite;
  layer_set_update_proc(window_layer, change_font_color);
  #endif

  initBatterySettings();
  initBatteryIcon(window);
  #ifdef USE_SDK4
  UnobstructedAreaHandlers handlers = {
    .change = prv_unobstructed_will_change
  };
  unobstructed_area_service_subscribe(handlers, NULL);
  #endif
  /*
    inverter_layer=inverter_layer_create(GRect(0, 0, 144, 168));
    layer_add_child(window_layer, inverter_layer_get_layer(inverter_layer));
    */
  //testrotlayer = rot_bitmap_layer_create(s_res_turbopebble);
  //rot_bitmap_layer_set_angle(testrotlayer,0x4000);
  //layer_add_child(window_layer, testrotlayer);

  //show_next_image();
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!E");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  #ifdef ROTATEIT
  layer_set_hidden(text_layer_get_layer(interval_layer),true);
  layer_set_hidden(text_layer_get_layer(twdate_layer),true);
  rotate_layer = effect_layer_create(GRect(0, statusbar_h-5, layer_get_bounds(window_layer).size.w, layer_get_bounds(window_layer).size.h - statusbar_h));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!F");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  effect_layer_add_effect(rotate_layer, effect_rotate_90_degrees, (void *)true);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!G");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  layer_add_child(window_layer, effect_layer_get_layer(rotate_layer));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!H");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  layer_set_hidden(effect_layer_get_layer(rotate_layer), true);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!I");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  mirror_layer = effect_layer_create(GRect(0, 0, layer_get_bounds(window_layer).size.w, layer_get_bounds(window_layer).size.h));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!J");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  effect_layer_add_effect(mirror_layer, effect_mirror_vertical, (void *)true);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!K");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  effect_layer_add_effect(mirror_layer, effect_mirror_horizontal, (void *)true);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!L");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  layer_add_child(window_layer, effect_layer_get_layer(mirror_layer));
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!M");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  layer_set_hidden(effect_layer_get_layer(mirror_layer), true);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!N");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());

  #endif
  timer = app_timer_register(60000, (AppTimerCallback) timer_callback, NULL);
}



static void change_updater(void){
  if(twimagecreated == 0){
    //show default image
    twdefault = gbitmap_create_with_resource(RESOURCE_ID_twdefault);
    bitmap_layer_set_bitmap(bitmap_layer, twdefault);
  }

  //APP_LOG(APP_LOG_LEVEL_DEBUG, "h1");
  //netdownload_destroy_context(app_message_get_context());
  app_message_set_context(NULL);
  //netdownload_deinitialize(); // call this to avoid 20B memory leak
  //APP_LOG(APP_LOG_LEVEL_DEBUG, "h2");
  app_message_deregister_callbacks();
  //APP_LOG(APP_LOG_LEVEL_DEBUG, "h3");
  oldfreed=1;
  //const int inbound_size = 400;
  //const int outbound_size = 400;
  //app_message_open(inbound_size, outbound_size);
  Tuplet initial_values[] = {
    //TupletInteger(SHOW_STATUS, (uint8_t) 1),
    TupletInteger(MESSAGE_KEY_status, 1),
    TupletCString(MESSAGE_KEY_twtext, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),
    TupletCString(MESSAGE_KEY_twdate, "2014-10-21 00:47:56"),
    TupletInteger(MESSAGE_KEY_offset, 0),
    TupletInteger(MESSAGE_KEY_updateinterval, 60),
    TupletInteger(MESSAGE_KEY_bgcolor, 0)
  };

  /*
    Tuplet initial_values[] = {
        TupletInteger(WEATHER_ICON_KEY, (uint8_t) 1),
        TupletCString(WEATHER_TEMPERATURE_KEY, "1234\u00B0C"),
        TupletCString(WEATHER_CITY_KEY, "St Pebblesburg"),
    };
    */

  //   app_sync_init(&sync, sync_buffer, sizeof(sync_buffer), initial_values, ARRAY_LENGTH(initial_values),
  //                 sync_tuple_changed_callback, sync_error_callback, NULL);
  app_message_register_inbox_received(sync_tuple_changed_callback);
  app_message_register_inbox_dropped(sync_error_callback);

  send_cmd();
  //handle_minute_tick(NULL, MINUTE_UNIT);
  /*if(firstrun == 1){
      APP_LOG(APP_LOG_LEVEL_DEBUG, "Hier");
      show_next_image();
      firstrun = 0;
    }*/
}


static void window_unload(Window *window) {
  //   effect_layer_destroy(test_effect_layer);
  health_service_events_unsubscribe();
  app_sync_deinit(&sync);
  text_layer_destroy(twtext_layer);
  text_layer_destroy(interval_layer);
  text_layer_destroy(twdate_layer);
  text_layer_destroy(status_layer);
  //text_layer_destroy(text_battery_layer);
  //layer_destroy(twtext_layer_layer);
  tick_timer_service_unsubscribe();
  //battery_state_service_unsubscribe();
  text_layer_destroy(text_date_layer);
  text_layer_destroy(text_time_layer);
  text_layer_destroy(text_showtime_layer);
  //inverter_layer_destroy(inverter_layer);
  fonts_unload_custom_font(s_res_vgafont40);
  //gbitmap_destroy(s_res_turbopebble);
  //bitmap_layer_destroy(turbolayer);
  #ifdef NOINVERTL
  inverter_layer_destroy(bluetooth_layer);
  #endif

  #ifdef SHOWWORKER
  gbitmap_destroy(s_res_bwork);
  gbitmap_destroy(s_res_bwork_inv);
  #endif
  //bitmap_layer_destroy(battery_layer);
  #ifdef SHOWWORKER
  bitmap_layer_destroy(worker_layer);
  #endif
  text_layer_destroy(s_num_label);
  #ifdef ROTATEIT
  effect_layer_destroy(rotate_layer);
  effect_layer_destroy(mirror_layer);
  #endif
  //if(twimagecreated==1){
  gbitmap_destroy(twdefault);
  //}
  deinitBatteryIcon();

}

static void handle_bluetooth(bool connected) {
  //text_layer_set_text(connection_layer, connected ? "connected" : "disconnected");

  if(connected == true){
    #ifdef INVERTL
    layer_set_hidden(inverter_layer_get_layer(bluetooth_layer), true);
    #endif
    updatetwit();
  }
  else{
    #ifdef INVERTL
    layer_set_hidden(inverter_layer_get_layer(bluetooth_layer), false);
    #endif
  }

}

static void updatetwit(void){
  if(waitfordl != 1){
    //APP_LOG(APP_LOG_LEVEL_DEBUG, "HHU");
    if(bluetooth_connection_service_peek()){
      /*
        Tuplet initial_values[] = {

            TupletInteger(SHOW_STATUS, (uint8_t) 1),
            TupletCString(SHOW_TWTEXT, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores"),
            TupletCString(SHOW_TWDATE, "2014-10-21 00:47:56 Clock"),
            TupletInteger(SHOW_OFFSET, 0),


            //TupletInteger(SHOW_STATUS, laststatus),
            //TupletCString(SHOW_TWTEXT, text_layer_get_text(twtext_layer)),
            //TupletCString(SHOW_TWDATE, text_layer_get_text(twdate_layer)),
            //TupletInteger(SHOW_OFFSET, showoffset),

        };
        */
      /*
        app_sync_init(&sync, sync_buffer, sizeof(sync_buffer), initial_values, ARRAY_LENGTH(initial_values),
        sync_tuple_changed_callback, sync_error_callback, NULL);
        */
      /*Tuplet initial_values[] = {
        //TupletInteger(SHOW_STATUS, (uint8_t) 1),
        TupletInteger(SHOW_STATUS, 1),
        TupletCString(SHOW_TWTEXT, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),
        TupletCString(SHOW_TWDATE, "2014-10-21 00:47:56"),
        TupletInteger(SHOW_OFFSET, 0),
        TupletInteger(SHOW_UPDATE, 60)
    };*/
      //app_sync_init(&sync, sync_buffer, sizeof(sync_buffer), initial_values, ARRAY_LENGTH(initial_values),
      //sync_tuple_changed_callback, sync_error_callback, NULL);

      send_cmd();
    }
  }
}

static void send_cmd2(void) {
  Tuplet value = TupletInteger(1, 1);
  uint8_t testresult;
  DictionaryIterator *iter;
  testresult = app_message_outbox_begin(&iter);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "%u" ,testresult);
  if (iter == NULL) {
    return;
  }

  //dict_write_tuplet(iter, &value);
  //dict_write_end(iter);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Open Twitch");
  dict_write_cstring(iter, MESSAGE_KEY_opentwitch, "opentwitch");
  //dict_write_cstring(iter, 6, "opentwitch");
  app_message_outbox_send();
}

static void updatetwit2(void){
  if(waitfordl != 1){
    //APP_LOG(APP_LOG_LEVEL_DEBUG, "HHU");
    if(bluetooth_connection_service_peek()){  
      send_cmd2();
    }
  }
}

void select_single_click_handler(ClickRecognizerRef recognizer, void *context) {
  //Window *window = (Window *)context;
  updatetwit2();
}

void select_long_click_release_handler(ClickRecognizerRef recognizer, void *context) {
  updatetwit2();
  //Window *window = (Window *)context;
}


void config_provider(Window *window) {
  // single click / repeat-on-hold config:
  //window_single_click_subscribe(BUTTON_ID_DOWN, down_single_click_handler);
  window_long_click_subscribe(BUTTON_ID_SELECT, 700, select_single_click_handler, select_long_click_release_handler);
  // multi click config:
  //window_multi_click_subscribe(BUTTON_ID_SELECT, 2, 10, 0, true, select_multi_click_handler);
  // long click config:
  //window_long_click_subscribe(BUTTON_ID_SELECT, 700, select_long_click_handler, select_long_click_release_handler);
}

static void init(void) {
  js_is_ready = 0;
  firstrun = 1;
  // Need to initialize this first to make sure it is there when
  // the window_load function is called by window_stack_push.
  window = window_create();
  //#ifndef PBL_SDK_2
  //#ifdef ROTATEIT
  // need to catch when app resumes focus after notification, otherwise background won't restore
//   app_focus_service_subscribe_handlers((AppFocusHandlers){
//     .did_focus = app_focus_changed
//   });
 //#endif
  //#endif
  netdownload_initialize(download_complete_handler);
  laststatus = 1;
  firststart = 1;
  

  window_set_background_color(window, GColorBlack);
  if(watch_info_get_firmware_version().major < 3){
    //window_set_fullscreen(window, true);
  }
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!1");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());

  //   window_set_window_handlers(window, (WindowHandlers) {
  //     .load = window_load,
  //     .unload = window_unload,
  //   });
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!2");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  //while(waitfordl==1){};
  //netdownload_deinitialize(); // call this to avoid 20B memory leak
  #ifndef ISFACE
  window_set_click_config_provider(window, (ClickConfigProvider) config_provider);
  #endif
  //const int inbound_size = 400;
  //const int outbound_size = 400;
  //app_message_open(inbound_size, outbound_size);



  //app_comm_set_sniff_interval(SNIFF_INTERVAL_NORMAL);
  tick_timer_service_subscribe(MINUTE_UNIT, handle_minute_tick);
  //battery_state_service_subscribe(updatebat);
  bluetooth_connection_service_subscribe(handle_bluetooth);
  //tick_timer_service_subscribe(HOUR_UNIT, updatetwit);
  //updatetwit();
  //handle_minute_tick(NULL, MINUTE_UNIT);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!3");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  //     window_set_window_handlers(window, (WindowHandlers) {
  //     .load = window_load,
  //     .unload = window_unload,
  //   });
  WindowHandlers handlers = {
    .load = window_load,
    .unload = window_unload
  };
  window_set_window_handlers(window, handlers);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!4");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  const bool animated = false;
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!5");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
  window_stack_push(window, animated);
  APP_LOG(APP_LOG_LEVEL_DEBUG, "We are here!6");
  APP_LOG(APP_LOG_LEVEL_DEBUG, "Free: %d ", heap_bytes_free());
}

void netdownload_out_failed(DictionaryIterator *iter, AppMessageResult reason, void *context) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "error downloading");

  //change_updater(); //Wir müssen dem Program sagen es soll irgendwie weitermachen und das hier killen.
  if(failcounter<=2){
    show_next_image();

    //     #ifdef PBL_COLOR
    //       #ifdef PBL_PLATFORM_BASALT
    //         netdownload_request("color_basalt");
    //   APP_LOG(APP_LOG_LEVEL_DEBUG, "color_basalt");
    //       #else
    //         netdownload_request("color");
    //   APP_LOG(APP_LOG_LEVEL_DEBUG, "color");
    //       #endif
    //     #else
    //      // #ifdef PBL_PLATFORM_BASALT
    //     if(watch_info_get_firmware_version().major == 3){
    //         netdownload_request("bw_basalt");
    //   APP_LOG(APP_LOG_LEVEL_DEBUG, "bw_basalt");
    //     }
    //     else{
    //      // #else
    //         netdownload_request("bw");
    //   APP_LOG(APP_LOG_LEVEL_DEBUG, "bw");
    //     }
    //       //#endif
    //     #endif

    failcounter += 1;
  }
  else{
    change_updater();
    //APP_LOG(APP_LOG_LEVEL_DEBUG, "Failed to send message. Reason = %s", translate_error(reason));
  }
}


static void deinit(void) {
  //#ifndef PBL_SDK_2
//   #ifdef ROTATEIT
//   app_focus_service_unsubscribe();
//   #endif
  //#endif
  app_comm_set_sniff_interval(SNIFF_INTERVAL_NORMAL);
  // if(oldfreed == 0){
  netdownload_deinitialize(); // call this to avoid 20B memory leak
  // }
  window_destroy(window);
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}