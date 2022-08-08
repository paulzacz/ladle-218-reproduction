import BEMHelper from 'react-bem-helper';

const NAMESPACE = 'ladle-218-reproduction';

/**
 * A convenience function for injecting className properties
 * into our react components according to BEM conventions.
 * See: https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
 *
 * @example
 *
 * import createBEMHelper from '../bem-helper';
 *
 * const classes = createBEMHelper({ name: 'flowsheet' });
 *
 * render() {
 *   return <div {...classes({
 *     element: 'row-header',
 *     modifiers: 'section',
 *     extra: 'fe_u_flex-container fe_u_flex-justify-content--center'
 *   })}
 *   >
 *   </div>;
 * }
 *
 * @param {string} name the name of the BEM block
 *
 * @returns {BEMHelper<BEMHelper.ReturnObject>} a BEM helper with the correct namespace
 */
const createBEMHelper = ({ name }: { name: string }): BEMHelper<BEMHelper.ReturnObject> => {
  return new BEMHelper({
    prefix: `${NAMESPACE}_c_`,
    name,
  });
};

export default createBEMHelper;
