import { fireEvent, render } from '@testing-library/react';

import { Form } from 'components/Form';

describe('Form component', () => {
  const mockOnSubmit = jest.fn();
  const props = {
    error: '',
    isDisabled: false,
    listOfCountries: [],
    onSubmit: mockOnSubmit,
  };

  it('renders default state for the form', () => {
    const { getByTestId } = render(
      <Form
        error={props.error}
        isDisabled={props.isDisabled}
        listOfCountries={props.listOfCountries}
        onSubmit={props.onSubmit}
      />
    );

    expect(
      (getByTestId('select-country-label') as HTMLInputElement).value
    ).toBe('US');
    expect((getByTestId('zipcode-label') as HTMLInputElement).value).toBe('');
  });

  it('keeps the submit button disabled when no postal code is provided', () => {
    const { getByTestId } = render(
      <Form
        error={props.error}
        isDisabled={props.isDisabled}
        listOfCountries={props.listOfCountries}
        onSubmit={props.onSubmit}
      />
    );
    const submitBtn = getByTestId('submit-button');
    expect(submitBtn).toHaveClass('Mui-disabled');
  });

  it('enables the submit button when the postal code is filled out', () => {
    const { getByTestId } = render(
      <Form
        error={props.error}
        isDisabled={props.isDisabled}
        listOfCountries={props.listOfCountries}
        onSubmit={props.onSubmit}
      />
    );
    const postalCode = getByTestId('zipcode-label');
    const submitBtn = getByTestId('submit-button');

    fireEvent.change(postalCode, { target: { value: '91403' } });
    fireEvent.click(submitBtn);

    expect(submitBtn).not.toHaveClass('Mui-disabled');
  });
});
