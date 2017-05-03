export function extendClassName(props, customClassName) {
  if (!props.className) {
    return customClassName;
  }
  return `${props.className} ${customClassName}`;
}

export function extendStyle(props, customStyle) {
  if (!props.style) {
    return customStyle;
  }
  return props.style;
}
