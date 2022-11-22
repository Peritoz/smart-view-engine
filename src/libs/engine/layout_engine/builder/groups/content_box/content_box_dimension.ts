import { Direction } from '@libs/common/distribution.enum';
import { DEFAULT } from '@libs/common/size_reference.const';
import { Dimension } from '@libs/model/dimension';
import { BoxDimension, BoxManager } from '@libs/engine/layout_engine/builder/groups/content_box/box_dimension';

/**
 * Content Box Dimension manages the changes in the used width and height, as well as the limits (max width and height)
 * of a virtual box
 */
export class ContentBoxDimension {
  protected boxDimension: BoxDimension; // Top left point to define the start X and Y box's limits
  protected direction: Direction; // Indicates the main axis direction: Horizontal or Vertical
  protected maxChildWidth: number; // Width of the biggest element
  protected maxChildHeight: number; // Height of the biggest element
  protected hasFixedWidth: boolean; // Indicates if the width is fixed or flexible; Flexible width will be adjusted when adding elements
  protected hasFixedHeight: boolean; // Indicates if the height is fixed or flexible; Flexible height will be adjusted when adding elements

  /**
   * Constructs an instance of ContentBoxDimension
   * @param top Top boundary position for the content area
   * @param left Left boundary position for the content area
   * @param direction Direction of content expansion
   * @param spaceBetween Length between content elements
   * @param hasFixedWidth Flag to handle the width as a fixed dimension
   * @param hasFixedHeight Flag to handle the height as a fixed dimension
   * @param dimension Maximum dimension (Width or/and Height) for the content area. If passed, the dimension will be fixed
   */
  constructor(
    top: number = DEFAULT.DEFAULT_PADDING,
    left: number = DEFAULT.DEFAULT_PADDING,
    direction: Direction = Direction.HORIZONTAL,
    spaceBetween: number = DEFAULT.DEFAULT_PADDING,
    hasFixedWidth: boolean = false,
    hasFixedHeight: boolean = false,
    dimension?: Partial<Dimension>,
  ) {
    if (hasFixedWidth && dimension?.width === undefined) {
      throw new Error('Has fixed width but no width was indicated');
    }

    if (hasFixedHeight && dimension?.height === undefined) {
      throw new Error('Has fixed height but no height was indicated');
    }

    this.boxDimension = new BoxDimension(
      top,
      left,
      spaceBetween,
      hasFixedWidth,
      hasFixedHeight,
      dimension,
    );
    this.direction = direction;
    this.maxChildWidth = 0; // Represents the width of the biggest child
    this.maxChildHeight = 0; // Represents the height of the biggest child
  }

  getBoxManager(): BoxManager {
    return this.boxDimension;
  }

  getContentBoxWidth(): number {
    return this.boxDimension.getContentBoxWidth();
  }

  getContentBoxHeight(): number {
    return this.boxDimension.getContentBoxHeight();
  }

  getSpaceBetween(): number {
    return this.boxDimension.getSpaceBetween();
  }

  setContentBoxWidth(width: number) {
    this.boxDimension.setWidth(width);
  }

  setContentBoxHeight(height: number) {
    this.boxDimension.setHeight(height);
  }

  getUsedWidth(): number {
    return this.boxDimension.getUsedWidth();
  }

  getUsedHeight(): number {
    return this.boxDimension.getUsedHeight();
  }

  setUsedWidth(value: number) {
    this.boxDimension.setUsedWidth(value);
  }

  setUsedHeight(value: number) {
    this.boxDimension.setUsedHeight(value);
  }

  getBiggestContentWidth(): number {
    return this.maxChildWidth;
  }

  getBiggestContentHeight(): number {
    return this.maxChildHeight;
  }

  incrementWidth(value: number, isFirstContent: boolean) {
    this.boxDimension.incrementWidth(value, isFirstContent);

    // Updating maximum element width
    if (value > this.maxChildWidth) {
      this.maxChildWidth = value;
    }
  }

  incrementHeight(value: number, isFirstContent: boolean) {
    this.boxDimension.incrementHeight(value, isFirstContent);

    // Updating maximum element height
    if (value > this.maxChildHeight) {
      this.maxChildHeight = value;
    }
  }

  addContent(
    content: Dimension,
    isFirstContent: boolean = false,
    onChangeWidth: (oldValue: number, newValue: number) => void = () => {
    },
    onChangeHeight: (oldValue: number, newValue: number) => void = () => {
    },
  ) {
    const oldWidth = this.getContentBoxWidth();
    const oldHeight = this.getContentBoxHeight();
    const isHorizontal = this.direction === Direction.HORIZONTAL;

    if (isHorizontal) {
      this.incrementWidth(content.width, isFirstContent);

      onChangeWidth(oldWidth, this.getContentBoxWidth());

      if (content.height > this.getUsedHeight()) {
        this.setUsedHeight(content.height);

        onChangeHeight(oldHeight, this.getContentBoxHeight());
      }
    } else {
      this.incrementHeight(content.height, isFirstContent);

      onChangeHeight(oldHeight, this.getContentBoxHeight());

      if (content.width > this.getUsedWidth()) {
        this.setUsedWidth(content.width);

        onChangeWidth(oldWidth, this.getContentBoxWidth());
      }
    }
  }
}
