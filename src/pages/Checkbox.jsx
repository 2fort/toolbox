import { useState } from 'react';
import Checkbox from '../components/Checkbox';

const CheckboxPage = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Checkbox
        id="test-checkbox"
        label="Test checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
    </div>
  );
};

export default CheckboxPage;
