const compose = (...func) => (comp) => {
    return func.reduceRight((wrapped, f) => f(wrapped), comp)
}

export default compose