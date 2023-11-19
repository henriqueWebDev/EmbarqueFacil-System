export default function validateCnpjScript(cnpjInput) {
   
   const cnpjClean = cnpjInput.replace(/\D/g, ''); 

   if (/^(\d)\1+$/.test(cnpjClean)) {
    return 'O CNPJ informado é inválido';
   }  

   let size = cnpjClean.length - 2;
   let numbers = cnpjClean.substring(0, size);
   const digitCheckers = cnpjClean.substring(size);   
   let sum = 0;
   let loopPosition = size - 7;
   for (let i = size; i >= 1; i--) {
     sum += parseInt(numbers.charAt(size - i), 10) * loopPosition--;
     if (loopPosition < 2) {
       loopPosition = 9;
     }
   }
   const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
   if (digit1 !== parseInt(digitCheckers.charAt(0), 10)) {
    return 'O CNPJ informado é inválido';
   }

   size = size + 1;
   numbers = cnpjClean.substring(0, size);
   sum = 0;
   loopPosition = size - 7;
   for (let i = size; i >= 1; i--) {
     sum += parseInt(numbers.charAt(size - i), 10) * loopPosition--;
     if (loopPosition < 2) {
       loopPosition = 9;
     }
   }  
   const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11); 
    if (digit2 !== parseInt(digitCheckers.charAt(1), 10)) {
       return 'O CNPJ informado é inválido';
    } 
   return true;
}