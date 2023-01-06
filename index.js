const inputTextToConvert = document.getElementById('input-text');
const inputTextConverted = document.getElementById('input-text-converted');
const buttonsToExecuteCommand = document.querySelectorAll('.btn-command');
const buttonClipboard = document.querySelector('.btn-clipboard');
const popover = document.getElementById('popover');

const COMMANDS_TO_EXECUTE = {
  sentence_case: convertToSenteceCase,
  lower_case: convertLoweCase,
  upper_case: convertToUppercase,
  title_case: convertToTitleCase,
}

function convertToSenteceCase(text) {
  const textConverted = String(text)[0].toUpperCase() + String(text).slice(1);
  setConvertedText(textConverted);
}

function convertLoweCase(text) {
  const textConverted = String(text).toLowerCase();
  setConvertedText(textConverted);
}

function convertToUppercase(text) {
  const textConverted = String(text).toUpperCase();
  setConvertedText(textConverted);
}

function convertToTitleCase(text) {
  const textConverted = String(text)
    .split(' ')
    .map(word => (word[0]).toUpperCase() + word.slice(1))
    .join(' ');

  setConvertedText(textConverted)
}

function setConvertedText(textConverted) {
  inputTextConverted.value = textConverted;
}

buttonsToExecuteCommand.forEach((button) => {
  button.addEventListener('click', () => {
    const textButton = button.textContent;
    const command = textButton.split(' ').join('_').toLocaleLowerCase();
    const textToConvert = inputTextToConvert.value;
    COMMANDS_TO_EXECUTE[command](textToConvert);
  })
});

buttonClipboard.addEventListener('click', async () => {
  const textToCopy = inputTextConverted.value;
  navigator.clipboard.writeText(textToCopy);

  popover.style.marginTop = '-20px';
  setTimeout(() => {
    popover.style.marginTop = '0px';
  }, 2500);
});