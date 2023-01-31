import WebSocket from 'ws';

class CoreClient {
  private static instance: CoreClient;
  private ws: WebSocket; // websocket client connection to scraper websockets server

  public static init(ws_url: string): CoreClient {
    if (!this.instance) {
      this.instance = new CoreClient(ws_url);
    }

    return this.instance;
  }

  private constructor(ws_url: string) {
    /* Give the scraper websocket server time to initialise */
    setTimeout(() => this.initWS(ws_url), 5000);
  }

  public initWS(url: string) {
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      console.log(`[core] Core client WS connection opened`);
    });

    this.ws.on('close', () => {
      console.error(`[core] Core client websocket closing...`);
    });

    this.ws.on('message', (res: string) => {
      const message = JSON.parse(res);

      if (Array.isArray(message)) {
        console.log('[core] message received from scraper at ', new Date());
        // console.log(message);
      }
    });

    console.log(`[core] Core client WS connection initialised...`);
  }
}

export { CoreClient };