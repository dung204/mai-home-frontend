export class StringUtils {
  static readonly PHONE_REGEX = /((o+84|0)[3|5|7|8|9]){1}([0-9]{8})\b/g;

  static unaccent(str: string) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  }
}
