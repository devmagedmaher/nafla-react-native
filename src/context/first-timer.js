import { createContext } from 'react';


const defaultValue = {};

defaultValue.value = false;

defaultValue.set = val => defaultValue.value = val;


const FirstTimerContext = createContext(defaultValue);


export { defaultValue };

export default FirstTimerContext;