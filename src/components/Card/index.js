import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { 
      type:'card',
      index,
      listIndex
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }
      
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) /2;
      
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;
      
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));


  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
        <Label color={data.color} />
      </header>
      <p>{data.content}</p>
      <img src={data.user} alt=""/>
    </Container>
  );
}
