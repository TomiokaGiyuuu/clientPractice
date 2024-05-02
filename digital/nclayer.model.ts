export enum Methods {
	browseKeyStore= 'browseKeyStore',
	setLocale = 'setLocale',
	getKeys = 'getKeys',
	signXml = 'signXml',
	deleteEntry = 'deleteEntry',
	signXmlByElementId = 'signXmlByElementId',
	verifyXml = 'verifyXml'
}
      
export class NCLayerModel {
	clazz?: string;
	method: Methods;
	args: Array<string>;
      
      
	constructor(clazz: string, method: Methods, args: Array<string>) {
		this.clazz = clazz;
		this.method = method;
		this.args = args;
	}
}
      