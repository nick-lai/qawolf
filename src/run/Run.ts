import { RunClient } from './RunClient';

type StopCallback = () => void | Promise<void>;

export class Run {
  private static _client: RunClient;
  private static _onStop: StopCallback[] = [];
  private static _stopped: boolean;

  private static async _handleStop() {
    if (this._stopped) return;

    this._stopped = true;

    const callbacks = this._onStop;
    await Promise.all(callbacks.map((fn) => fn()));

    this._client.sendStopped();
    this._client.close();
  }

  public static _connect() {
    const port = process.env.QAW_RUN_SERVER_PORT;
    if (this._client || !port) return;

    this._client = new RunClient(Number(port));
    this._client.once('stop', () => this._handleStop());
  }

  public static close() {
    // do not try to close in the middle of a stop
    if (this._stopped || !this._client) return;

    this._client.close();
    this._client = null;
  }

  public static codeUpdate(code: string) {
    if (!this._client) return;

    this._client.sendCodeUpdate(code);
  }

  public static onStop(callback: StopCallback) {
    this._onStop.push(callback);
  }

  public static stopRunner() {
    if (!this._client) return;

    this._client.sendStopRunner();
  }
}

Run._connect();
