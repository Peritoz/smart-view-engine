# Smart View Dev Docs

## Assumptions

- 3 Categories of elements
    - Row or Col: Invisible groups for vertical or horizontal grouping
    - Visible Row or Visible Col: Visible group elements that group other elements vertically or horizontally
    - Base Element: Box element (Leaves)
- All elements have Width and Height
    - Container elements (Row, Col, Visible Row and Visible Col) have content box
        - In visible elements, the content box considers:
            - Label area
            - Label position
            - Padding
        - Invisible elements do not have padding between the edge and the content box
- When inserting an element, its position must be relative, but it must consider padding and other offsets (this causes only changes in size to trigger redistribution)
- When inserting an element the dimensions of the parent element must be adjusted
- When inserting an element, the child elements must be redistributed and realigned
- Groups with *Extended* (alignment option) dimensions only accept children with the same *Extended* dimension
- It must not be possible to arbitrarily specify width or height for children of a group with Extended alignment option. Note that these constraints only applies to the related axis. For example, you can't arbitrarily change the width of a child if the horizontal axis alignment option is *Extended*.
- Groups with *Extended* must be initialized with the maximum size of the axis with *Extended* characteristic (this way, regardless of what happens internally in the group, the size will not change)
- If during the insertion of an element the size of the parent changes, it must be adjusted the size of the parent of the parent, performing redistribution and realignment. If the size of the parent of the parent changes, the algorithm must be applied again recursively