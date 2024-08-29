import Container from '@/components/common/base/Container';
import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale, locales } from '@/navigation';
import CitiesCardSection from '@/sections/cities';
import CitiesSkeleton from '@/sections/cities/components/CitiesSkeleton';
import { languagesMap } from '@/services/data/languages';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Suspense } from 'react';
import styles from './index.module.css';

interface Props {
  params: { page: string; locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * Generates metadata for the CitiesPage.
 *
 * @param params - The parameters containing the page number and locale.
 * @returns Metadata object for SEO purposes.
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  const title = `${t('u83smi2IxkCQLgZEi0ZjC')} | ${params.page}`;
  const description = t('AG04YmC7UFrxFR6uCVdKg');

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/cities/${params.page}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/cities/${params.page}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title,
      description,
      url: `https://travolic.com/${params.locale}/cities/${params.page}`,
      siteName: 'Travolic',
      images: [
        {
          url: '/ogImage.png',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@Travolicllc',
      images: [
        {
          url: '/ogImage.png',
          width: 2400,
          height: 1256,
          username: '@Travolicllc',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale, page: '1' }));
}

const CitiesPage = async ({
  params: { page = 1, locale },
}: {
  params: { page: number; locale: locale };
}) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('OBDPT8xkrIgOUkUFNL2Av')} />
      <Container>
        <h1 className={styles.firstHeading}>{t('B47z5wfbkDzceC4N-gxw5')}</h1>
        <h2 className={styles.secondHeading}>{t('rPGCa6y-sOLa04Fj9XN6A')}</h2>
        <div className={styles.subContainer}>
          <Image
            src={commonImgUrl('dynamic-cities.svg')}
            alt={t('Q6Rbaeu3zU_SY7hHpmam5')}
            width={1000}
            height={0}
            priority
          />

          {/* Suspense to handle loading state with a fallback skeleton, totalPages is static number because this is only a loading skeleton */}
          <Suspense fallback={<CitiesSkeleton page={page} totalPages={5173} />}>
            <CitiesCardSection page={page} locale={locale} />
          </Suspense>
        </div>
      </Container>
    </>
  );
};

export default CitiesPage;
