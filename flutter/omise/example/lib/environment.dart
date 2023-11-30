class Environment {
  static String? get omisePublicKey => const String.fromEnvironment(
        'OMISE_PUB_KEY',
      );
  static String? get apiHostAndroid => const String.fromEnvironment(
        'APP_HOST_ANDROID',
      );
  static String? get apiHost => const String.fromEnvironment(
        'APP_HOST',
      );
  static String? get googlePayEnvironment => const String.fromEnvironment(
        'GOOGLE_PAY_ENV',
      );
}
