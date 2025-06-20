

// class A {

//     private config

//     constructor(config: Record<string, string>)
//     constructor(config: string)
//     constructor(config: Record<string, string> | string) {

//         switch (typeof config) {
//             case 'string':
//                 this.fromString(config);
//                 break;
//             case 'object':
//                 this.fromObject(config);
//                 break;
//             default:
//                 throw new Error('Invalid config type. Expected string or object.');
//         }

//     }

//     protected fromString(config: string) {
//         console.log('Parsing config from string:', config);
//     }


//     protected fromObject(config: Record<string, string>) {
//         console.log('Parsing config from object:', config);
//     }
// }




// class B extends A {

//     constructor(config: Record<string, string>)
//     constructor(config: string)
//     constructor(config: Record<string, string> | string) {
//         super(config as any);
//     }

//     protected fromString(config: string) {
//         console.log('B parsing config from string:', config);
//     }

//     protected fromObject(config: Record<string, string>) {
//         console.log('B parsing config from object:', config);
//     }
// }


// const a = new A('test');
// const b = new B({ key: 'value' });