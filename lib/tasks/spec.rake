require 'rake/testtask'

Rake::TestTask.new :spec do |t|
  t.libs.push 'spec'
  t.pattern = 'spec/**/*_spec.rb'
  t.verbose = true
end
