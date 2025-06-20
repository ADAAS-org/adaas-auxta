import { AuxtaDynamicDimension } from "@auxta/core/dimensions/AuxtaDynamicDimension.class";



export const Temperature = new AuxtaDynamicDimension({
    type: 'string',
    mode: 'disk',
    behavior: 'latest',
    name: 'Temperature',
    value: '20C',
})