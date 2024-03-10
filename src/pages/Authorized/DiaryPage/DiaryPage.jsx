import { DiaryExercises } from '../../../components/DiaryComponents/DiaryExercises/DiaryExercises';
import { DiaryProducts } from '../../../components/DiaryComponents/DiaryProducts/DiaryProducts';
import MediaQuery from 'react-responsive';
// import { TitlePage } from '../../../components/TitlePage/TitlePage';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import format from 'date-fns';
import DaySwitch from '../../../components/DiaryComponents/DaySwitch/DaySwitch';
import {
  Title,
  DiaryTitleWrap,
  DiaryActWrap,
  DiaryContentWrap,
} from './DiaryPage.style';
import { Loader } from '../../../components/Loader/Loader';
import { selectIsLoadingDiary } from '../../../redux/diary/selectors';
import { getDiaryList } from '../../../redux/diary/operation';
import { refreshUser } from '../../../redux/auth/operation';
import { DiaryWidgets } from '../../../components/DiaryWidgets/DiaryWidgets';
import {Section} from '../../../components/DiaryComponents/Section/Section'

export const DiaryPage = () => {
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState(
    format(new Date(), 'dd-MM-yyyy')
  );
  const isLoading = useSelector(selectIsLoadingDiary);

  const handleDateChange = (date) => {
    const newDate = format(date, 'dd-MM-yyyy');
    setSelectDate(newDate);
  };

  useEffect(() => {
    dispatch(getDiaryList(selectDate));
  }, [dispatch, selectDate]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <Section>
        <DiaryTitleWrap>
          <Title>Diary</Title>
          <DaySwitch onChangeDate={handleDateChange} />
        </DiaryTitleWrap>
        <MediaQuery maxWidth={765}>
          <DiaryWidgets/>
        </MediaQuery>
        <DiaryContentWrap>
          <DiaryActWrap>
            <DiaryProducts />
            <DiaryExercises />
          </DiaryActWrap>
          <MediaQuery minWidth={768}>
          <DiaryWidgets/>
          </MediaQuery>
        </DiaryContentWrap>
      </Section>
    </>
  );
};
