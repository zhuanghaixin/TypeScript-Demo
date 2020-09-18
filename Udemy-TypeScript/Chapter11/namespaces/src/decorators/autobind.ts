namespace App {
    //autobind Decorator
  export  function Autobind(
        _: any,
        _2: string,
        descriptor: PropertyDescriptor) {
        // console.log('descriptor')
        // console.log(descriptor)
        const originalMethod = descriptor.value;
        // console.log(originalMethod)
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            enumerable: false,
            get() {
                // console.log(this)  //ProjectInput
                const boundFn = originalMethod.bind(this)
                return boundFn
            }
        }
        return adjDescriptor

    }
}
