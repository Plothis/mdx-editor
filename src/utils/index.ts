export function Object2FormData(data: Record<string, any>) {
    const form = new FormData()
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key]
            form.append(key, value)
        }
    }
    return form
}


export function toHump(name: string) {

    return name.replace(/^(\w)/,function(all, letter){
        return letter.toUpperCase();
    }).replace(/_(\w)/g, function(all, letter){
        return ' ' + letter.toUpperCase();
    });
}


export function getStyles(style: string) {
    var output: Record<string, string> = {};
  
    if (!style) {
        return {};
    }
  
    var camelize = function camelize(str: string) {
        return str.replace (/-(.)/g, (match: string, $1: string | undefined) => {
          if ($1) {
            return $1.toUpperCase();
          }
          return match;
        })
    }
  
    var styleArr = style.split(';');
  
    for (var i = 0; i < styleArr.length; ++i) {
  
        var rule = styleArr[i].trim();
  
        if (rule) {
            var ruleParts = rule.split(':');
            var key = camelize(ruleParts[0].trim());
            output[key] = ruleParts[1].trim();
            
        }
    }
  
    return output;
  }