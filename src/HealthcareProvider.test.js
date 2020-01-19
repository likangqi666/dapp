import React from 'react';
import { render } from '@testing-library/react';
import HealthcareProvider from './HealthcareProvider';

test('renders learn react link', () => {
  const { getByText } = render(<HealthcareProvider />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
