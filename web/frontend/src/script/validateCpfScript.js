export default function validateCpfScript(cpfInput) {

  const cpfClean = cpfInput.replace(/\D/g, '');

  if (/^(\d)\1{10}$/.test(cpfClean)) {
    return 'O CPF informado é inválido';
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfClean.charAt(i)) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 > 9) {
    digit1 = 0;
  }
  if (parseInt(cpfClean.charAt(9)) !== digit1) {
    return 'O CPF informado é inválido';
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfClean.charAt(i)) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 > 9) {
    digit2 = 0;
  }
  if (parseInt(cpfClean.charAt(10)) !== digit2) {
    return 'O CPF informado é inválido';
  }

  return true;
}