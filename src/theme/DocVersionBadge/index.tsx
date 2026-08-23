import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc, useDocsVersion} from '@docusaurus/plugin-content-docs/client';
import {SDK_RELEASE} from '@site/src/constants/releases';

type DocVersionBadgeProps = {
  className?: string;
};

export default function DocVersionBadge({className}: DocVersionBadgeProps): ReactNode {
  const versionMetadata = useDocsVersion();
  const {metadata} = useDoc();

  if (!versionMetadata.badge) {
    return null;
  }

  const isSdkPage = metadata.permalink.includes('/docs/sdk/');
  const versionLabel = isSdkPage ? `SDK · ${SDK_RELEASE}` : versionMetadata.label;

  return (
    <span
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBadge,
        'badge badge--secondary',
      )}>
      <Translate
        id="theme.docs.versionBadge.label"
        values={{versionLabel}}>
        {'Version: {versionLabel}'}
      </Translate>
    </span>
  );
}
