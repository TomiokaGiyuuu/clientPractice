import {Queue} from '../util/queue.util';
import {Deferred} from '../util/deferred.util';
import Modal from "../../classes/Modal";

export class WebSocketService {
  ws: WebSocket;
  socketIsOpen: number = 1;
  browseIsOpen = false;
  private queue: Queue<Deferred<Result>> = new Queue<Deferred<Result>>();
  private result: Result;
  modal: Modal;
  heartbeatInterval: NodeJS.Timer;

  ping() {
    try { this.sendMessage('--heartbeat--') }
    catch (error) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
      this.close()
    }
  }

  public setBrowseIsOpen(bool: boolean) {
    // console.log(bool)
    this.browseIsOpen = bool
  }

  createObservableSocket(url: string, resolve: () => void, reject: () => void): void {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      if (!this.heartbeatInterval) {
        this.heartbeatInterval = setInterval(() => this.ping(), 1000)
      }
    }

    this.ws.onmessage = (event: MessageEvent<any>) => {
      // console.log("om", event)

      if (event.data === '{"result":{"version":"1.2"}}') {
        resolve();
      }

      if (event.data === "--heartbeat--" && this.browseIsOpen) {
        this.setBrowseIsOpen(false)
      }

      if (!this.queue.isEmpty()) {
        this.result = new Result();
        this.result.build(event.data);
        this.queue.pop().resolve(this.result);
      }
    };

    this.ws.onerror = (event) => {
      // console.log("oe", event)

      if (!this.queue.isEmpty()) {
        this.queue.pop().reject(event);
      }
    };

    this.ws.onclose = (event) => {
      // console.log("oc", event)
      reject();
      
      if (event.wasClean) this.queue.clearAll();
      else { 
        const modal = new Modal();
        modal.open(`
          <h2>Ошибка при подключении к NCALayer</h2>
          <p>Убедитесь что программа NCALayer запущена и повторите попытку.</p>
        `);
      }
    };
  }

  public sendMessage(message: string): Deferred<Result> {
    if (this.ws.readyState === this.socketIsOpen) {
      const d = new Deferred<Result>();
      this.queue.push(d);
      this.ws.send(message);
      return d;
    }
  }

  public close(): void {
    if (this.ws) this.ws.close();
  }
}

export class Result {
  result?: string;
  secondResult?: string;
  errorCode?: string;

  public build(response: string): void {
    try {
      const obj = JSON.parse(response);
      this.result = obj.result;
      this.secondResult = obj.secondResult;
      this.errorCode = obj.errorCode;
    } catch(e: unknown) {
      this.result = response; 
    }
  }
}

