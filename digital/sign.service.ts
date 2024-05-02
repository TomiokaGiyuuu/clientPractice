import {Result, WebSocketService} from './websocket.service';
import {Deferred} from '../util/deferred.util';
import {Methods, NCLayerModel} from '../model/nclayer.model';

const NCLAYER_URL = 'wss://127.0.0.1:13579/';

enum EXTENSIONS {
  p12 = 'p12',
  p12Upper = 'P12',
  cer = 'cer',
  cerUpper = 'CER',
  crt = 'crt',
  crtUpper = 'CRT',
  der = 'der',
  derUpper = 'DER'
}

export class SignService {
  public ws: WebSocketService;

  constructor() {
    this.ws = new WebSocketService();
  }

  public async initSocket(resolve: () => void, reject: () => void) {
    this.ws.createObservableSocket(NCLAYER_URL, resolve, reject);
  }

  public closeSocket(): void {
    this.ws.close();
  }

  public heartBeat(): Deferred<Result> {
    return this.ws.sendMessage('--heartbeat--');
  }

  public browseKeyStore(storageName: string, fileExtension: string, currentDirectory: string): Deferred<Result> {
    return this.sendMessage(new NCLayerModel('kz.gov.pki.knca.applet.Applet',
      Methods.browseKeyStore, [storageName, fileExtension, currentDirectory]));
  }

  public setLocale(language: string): Deferred<Result> {
    return this.sendMessage(new NCLayerModel(null, Methods.setLocale, [language]));
  }

  getKeys(storageName: string, storagePath: string, password: string, type: string): Deferred<Result> {
    return this.sendMessage(new NCLayerModel(null, Methods.getKeys, [storageName, storagePath, password, type]));
  }

  signXml(storageAlias: string, container: string, keyType: string, xmlString: string): Deferred<Result> {
    return this.sendMessage(new NCLayerModel(null, Methods.signXml, [storageAlias, container, keyType, xmlString]));
  }

  deleteEntry(storageName: string, container: string, alias: string): Deferred<Result>  {
    return this.sendMessage(new NCLayerModel(null, Methods.deleteEntry, [storageName, container, alias]));
  }

  signXmlByElementId(storageName: string, storagePath: string, alias: string, password: string, xmlToSign: string, elementId: string, signatureParentElement: string): Deferred<Result> {
    return this.sendMessage(new NCLayerModel(null, Methods.signXmlByElementId,
      [storageName, storagePath, alias, password, xmlToSign, elementId, signatureParentElement]));
  }

  verifyXml(xmlSignature: string): Deferred<Result> {
    return this.sendMessage(new NCLayerModel(null, Methods.verifyXml, [xmlSignature]));
  }

  verifyXmlById(xmlSignature: string, signatureElement: string): Deferred<Result> {
    return this.sendMessage(new NCLayerModel(null, Methods.verifyXml, [xmlSignature, signatureElement]));
  }

  private isFile(pathname?: string): boolean {
    const extension = pathname.split('/').pop().split('.').pop();
    if (extension !== null) {
      return (Object as any).values(EXTENSIONS).includes(extension);
    }
    return false;
  }

  private getParent(pathname?: string): string {
    return pathname.match(/(.*)[\/\\]/)[1] || '';
  }

  private sendMessage(model: NCLayerModel): Deferred<Result> {
    return this.ws.sendMessage(JSON.stringify(model, (key, value) => {
      if (value) return value;
    }));
  }
}
