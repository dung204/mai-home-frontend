import { DocsContainer, DocsContextProps } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import { ThemeVars, create, themes } from '@storybook/theming';
import React from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import '@/base/styles/globals.css';

import nextIntl from './next-intl';

const preview: Preview = {
  initialGlobals: {
    locale: 'en',
    locales: {
      en: { icon: '🇺🇸', title: 'English', right: 'EN' },
      vi: { icon: '🇻🇳', title: 'Tiếng Việt', right: 'VN' },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
        actions: /^on.*/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Design System', '*'],
        locales: 'en-US',
      },
    },
    docs: {
      container: function Comp({
        children,
        ...props
      }: {
        children: React.ReactNode;
        context: DocsContextProps;
        theme?: ThemeVars;
      }) {
        const [isDark, setDark] = React.useState(true);

        React.useEffect(() => {
          props.context.channel.on(DARK_MODE_EVENT_NAME, setDark);

          return () => props.context.channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
        }, [props.context.channel]);

        return (
          <DocsContainer {...props} theme={isDark ? themes.dark : themes.normal}>
            <div className="docs-container antialiased">{children}</div>
          </DocsContainer>
        );
      },
    },
    darkMode: {
      dark: create({
        base: 'dark',
      }),
      light: create({
        base: 'light',
      }),
      stylePreview: true,
    },
    nextIntl,
  },
};

export default preview;
