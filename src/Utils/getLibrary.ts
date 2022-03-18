import {Web3Provider} from '@ethersproject/providers'


function getLibrary(provider?: any, connector?: any): any {
    
    return new Web3Provider(provider) 
  }
 
  
export default getLibrary;  
