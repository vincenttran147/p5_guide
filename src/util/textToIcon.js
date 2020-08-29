export default function (text) {
  text = text.toLowerCase();
  switch (text) {
    case 'good':
      return '✨';
    case 'ok':
      return '💦';
    case 'bad':
      return '💢';
    default:
      return text;
  }
}
