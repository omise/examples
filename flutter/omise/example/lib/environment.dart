class Environment {
  static String? get omisePublicKey => const String.fromEnvironment(
        'OMISE_PUB_KEY',
      );
  static String? get apiHostAndroid => const String.fromEnvironment(
        'API_HOST_ANDROID',
      );
  static String? get apiHost => const String.fromEnvironment(
        'API_HOST',
      );
}
