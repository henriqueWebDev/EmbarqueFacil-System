function calculateCheckDigit(rgWithoutDigit) {
   const weights = [2, 3, 4, 5, 6, 7, 8, 9];
   let sum = 0;
 
   for (let i = 0; i < rgWithoutDigit.length; i++) {
     sum += parseInt(rgWithoutDigit.charAt(i)) * weights[i];
   }

   const rest = sum % 11;
   const verifyingDigit = 11 - rest;
 
   return verifyingDigit >= 10 ? 0 : verifyingDigit;
 }

export default function validateRgScript(fullRg) {
   const rgWithoutPunctuation = fullRg.replace(/\D/g, '');
   const rgWithoutDigit = rgWithoutPunctuation.substring(0, 8);
   const rgDigit = parseInt(rgWithoutPunctuation.charAt(8));
   const calculatedDigit = calculateCheckDigit(rgWithoutDigit);
 
   if (rgDigit === calculatedDigit) {
      return true
   } else {
      return 'O número de Registro Geral (RG) fornecido não é válido. Por favor, verifique e insira um RG válido.'
   }
}

 