import Plugin from 'stc-plugin';
import {extend} from 'stc-helper';

let less = null;
let options = null;
/**
 * Use ESlint to verify code
 */
export default class Less2CssPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    if(!less){
      less = require('less');
    }
    if(!options){
      options = extend(options, this.options);
    }
    let content = await this.getContent('utf8');
    let output;
    try{
      output = (await less.render(content, {})).css;
    }
    catch(e){
      return {err: {
        message: e.message
      }};
    }
    return {output};
  }
  /**
   * update
   */
  update(data){
    let {err} = data;
    if(err){
      return this.fatal(err.message);
    }
    this.file.extname = this.options.extname || 'css';
    this.setContent(data.output);
  }
  /**
   * use cluster
   */
  static cluster(){
    return true;
  }
  /**
   * enable cache
   */
  static cache(){
    return false;
  }
}