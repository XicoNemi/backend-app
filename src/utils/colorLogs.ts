export function loggerXiconemi(color: string, message: string, type: string = 'default') {
  const colors: { [key: string]: string } = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
  };

  const reset = '\x1b[0m';

  const colorCode = colors[color] || colors.white;

  const generateLog = () => {
    let logTopAndBottom = '';
    let logMessage = '';

    switch (type) {
      case 'success':
        logTopAndBottom = '\x1b[32m=====================================\x1b[0m'; // Verde
        logMessage = `\x1b[32m${message}\x1b[0m`;
        break;
      case 'error':
        logTopAndBottom = '\x1b[31m=====================================\x1b[0m'; // Rojo
        logMessage = `\x1b[31m${message}\x1b[0m`;
        break;
      case 'reddis':
        logTopAndBottom = '\x1b[31m=====================================\x1b[0m'; // Rojo
        logMessage = `\x1b[31m${message}\x1b[0m`;
        break;
      case 'mysql':
        logTopAndBottom = '\x1b[34m=====================================\x1b[0m'; // Azul
        logMessage = `\x1b[34m${message}\x1b[0m`;
        break;
      case 'swagger':
        logTopAndBottom = '\x1b[33m=====================================\x1b[0m'; // Amarillo
        logMessage = `\x1b[33m${message}\x1b[0m`;
        break;
      default:
        logTopAndBottom = '\x1b[0m=====================================\x1b[0m'; // Sin color
        logMessage = message;
        break;
    }

    console.log(logTopAndBottom);
    console.log(logMessage);
    console.log(logTopAndBottom);
  };

  generateLog();
}
