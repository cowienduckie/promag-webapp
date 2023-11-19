export const TaskList = (props: any) => {
  const { children, innerRef, ...otherProps } = props;

  return (
    <div ref={innerRef} {...otherProps}>
      {children}
    </div>
  );
};
