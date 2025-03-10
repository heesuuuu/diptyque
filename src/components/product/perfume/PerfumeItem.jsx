import { useEffect, useState } from "react";

const PerfumeItem = ({ item }) => {
  const { name, description, options } = item;
  // const twoSentences = description.split('.').slice(0, 2).join('.') + '.';
  const price = options[0].price;
  const thumbImg = options[0].images.thumbnail.default;
  const hoverImg = options[0].images.thumbnail.hover;

  const maxChars = 110;
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const sentences = description.split('. ');
    let result = '';
    let currentLength = 0;

    // 문장을 하나씩 추가하면서 최대 글자 수 체크
    for (const sentence of sentences) {
      // 마침표와 공백을 포함한 문장 길이
      const sentenceLength = sentence.length + 2; // 마침표와 공백 포함

      // 이 문장을 추가했을 때 최대 글자 수를 초과하는지 확인
      if (currentLength + sentenceLength > maxChars) {
        break;
      }

      // 문장 추가
      if (result) {
        result += '. ' + sentence;
      } else {
        result = sentence;
      }

      currentLength += sentenceLength;
    }

    // 결과 텍스트에 마침표 추가 (없는 경우)
    if (result && !result.endsWith('.')) {
      result += '.';
    }

    setDesc(result);
  }, [description, maxChars]);

  return (
    <div className=" w-[437px] h-[625px] lg:w-[200px] lg:h-[263px]">
      <img src={thumbImg} alt={name} />
      <h2 className="text-heading3/[160%]">{name}</h2>
      <p className="text-body3/[150%] line-clamp-2">{desc ? desc : description}</p>      
      <span>€{price}</span>
    </div>
  );
};

export default PerfumeItem;
