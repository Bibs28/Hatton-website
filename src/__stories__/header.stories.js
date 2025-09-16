import React from 'react'

import { storiesOf } from '@storybook/react'

import Header from '../components/layout/header/header'

storiesOf('Header', module).add('default', () => <Header siteTitle="Test" />)
