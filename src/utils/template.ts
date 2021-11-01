
/**
 * 
 * @param {string} string 
 * @returns {(data?: any) => string}
 * @example
 * template('I am {{name}}')({name: 'Super man'}) 
 * // => 'I am Super man'
 * var compiled = template('I am {{name}}')
 * compiled({name: 'Super man'})
 * // => 'I am Super man'
 */
function template(string: string, interpolate: RegExp = /\{\{([\s\S]+?)\}\}/g) {
    return function(data: Record<string, any>) {
        return string.replace(interpolate, function(match, $1) {
            const key = $1
            if (data[key] == null) {
                return match
            }
            return data[key]
        });
    }
}
export default template