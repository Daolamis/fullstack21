import React, { useImperativeHandle, useState } from "react"

const Togglable = React.forwardRef(({ visibleLabel, hideLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);
  const buttonLabel = !visible ? hideLabel : visibleLabel;

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      <div style={{ display: visible ? '' : 'none' }} >
        {children}
      </div>
      <button onClick={toggleVisibility}>{buttonLabel}</button>
    </div >
  )
});

export default Togglable;