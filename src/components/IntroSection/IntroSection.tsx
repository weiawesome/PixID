import { useTranslation } from 'react-i18next';
import { Image, Scissors, Download, Sparkles } from 'lucide-react';

export default function IntroSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Image,
      title: t('intro.feature1.title'),
      description: t('intro.feature1.description')
    },
    {
      icon: Scissors,
      title: t('intro.feature2.title'),
      description: t('intro.feature2.description')
    },
    {
      icon: Download,
      title: t('intro.feature3.title'),
      description: t('intro.feature3.description')
    }
  ];

  return (
    <div className="w-full max-w-4xl text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 whitespace-nowrap">
          {t('intro.title')}
        </h2>
      </div>
      
      <p className="text-base text-gray-600 mb-6 whitespace-nowrap">
        {t('intro.description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1 whitespace-nowrap">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 whitespace-nowrap">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 whitespace-nowrap">
        {t('intro.preset_hint')}
      </p>
    </div>
  );
}
