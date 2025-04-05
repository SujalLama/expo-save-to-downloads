require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'expo-save-to-downloads'  # match your npm name here
  s.version      = package['version']
  s.summary      = package['description']
  s.description  = package['description']
  s.license      = package['license']
  s.author       = package['author']
  s.homepage     = package['homepage']
  s.platform     = :ios, '12.0'              # keep tvOS only if needed
  s.swift_version = '5.0'                    # 5.4 may not be needed

  s.source       = { :git => 'https://github.com/SujalLama/expo-save-to-downloads.git', :tag => "#{s.version}" }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.source_files = "ios/**/*.{h,m,mm,swift}"  # better scoped

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES'
  }
end
