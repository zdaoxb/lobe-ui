import { Form as AntForm, FormProps as AntFormProps, type FormInstance } from 'antd';
import { LucideIcon } from 'lucide-react';
import { type ReactNode, forwardRef } from 'react';

import FormFooter from './components/FormFooter';
import FormGroup from './components/FormGroup';
import FormItem, { FormItemProps } from './components/FormItem';
import { useStyles } from './style';

export interface ItemGroup {
  children: FormItemProps[];
  extra?: ReactNode;
  icon?: LucideIcon;
  title: string;
}

export interface FormProps extends AntFormProps {
  children?: ReactNode;
  footer?: ReactNode;
  itemMinWidth?: FormItemProps['minWidth'];
  items?: ItemGroup[];
}

const Form = forwardRef<FormInstance, FormProps>(
  ({ className, itemMinWidth, footer, items, children, ...props }, ref) => {
    const { cx, styles } = useStyles();
    return (
      <AntForm
        className={cx(styles.form, className)}
        colon={false}
        layout="horizontal"
        ref={ref}
        {...props}
      >
        {items?.map((group, groupIndex) => (
          <FormGroup extra={group?.extra} icon={group?.icon} key={groupIndex} title={group.title}>
            {group.children
              .filter((item) => !item.hidden)
              .map((item, itemIndex) => {
                return (
                  <FormItem
                    divider={itemIndex !== 0}
                    key={itemIndex}
                    minWidth={itemMinWidth}
                    {...item}
                  />
                );
              })}
          </FormGroup>
        ))}
        {children}
        {footer && <FormFooter>{footer}</FormFooter>}
      </AntForm>
    );
  },
);
export default Form;
