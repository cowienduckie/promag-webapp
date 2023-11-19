export const Container = (props: any) => {
  const { children, innerRef, ...otherProps } = props;

  return (
    <div ref={innerRef} {...otherProps}>
      {children}
    </div>
  );
};
