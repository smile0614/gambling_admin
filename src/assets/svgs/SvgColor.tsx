type styleProps = {
  [key: string]: string | number;
};

export default function SvgColor({
  src,
  style,
  className,
  ...other
}: {
  src: string;
  style: styleProps;
  className?: string;
}) {
  return (
    <div
      role="span"
      className={className}
      style={{
        width: 24,
        height: 24,
        display: "inline-block",
        backgroundColor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...style,
      }}
      {...other}
    />
  );
}
