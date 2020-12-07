import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { gsap } from 'gsap';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

const AddForm = observer(({ active, setActive, setRedirect }) => {
  const { baublesStore } = useStore();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const history = useHistory();
  const { treeId } = useParams();

  let titleRef,
    nameRef,
    messageRef,
    submitRef,
    cancelRef = useRef(null);

  useEffect(() => {
    setActive(true);
    setRedirect(false);
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const bauble = baublesStore.baubleFromUser;
    bauble.setInfo({ name, text, treeId: treeId });

    // Push to database
    await bauble.create();

    // Get updated bauble with right id
    const updatedBauble = baublesStore.baubleFromUser;
    updatedBauble.setOrigin('data');
    history.push(ROUTES.tree.to + treeId + ROUTES.detail.to + updatedBauble.id);
  };

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    text: {
      yPos: active ? 0 : 150,
      delay: active ? 0.5 : 0.1,
      stagger: active ? 0.1 : -0.1,
      duration: active ? 0.6 : 0.6,
    },
  };

  useEffect(() => {
    gsap.to([titleRef, nameRef, messageRef, submitRef, cancelRef], {
      duration: animation.text.duration,
      y: animation.text.yPos,
      opacity: animation.opacity,
      delay: animation.text.delay,
      stagger: {
        ease: 'Power2.easeIn',
        amount: animation.text.stagger,
      },
    });
  }, [active]);

  const handleClickClose = async () => {
    setActive(false);
    baublesStore.removeBaubleFromUser();
    history.push(ROUTES.tree.to + treeId);
  };

  return (
    <div className={styles.form__wrapper}>
      <p
        ref={(el) => {
          titleRef = el;
        }}
        className={styles.form__title}
      >
        Write your message
      </p>
      <div>
        <form className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
          <label
            ref={(el) => {
              nameRef = el;
            }}
            htmlFor="name"
          >
            <span>Name</span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              maxlength="15"
              required
            />
          </label>
          <label
            ref={(el) => {
              messageRef = el;
            }}
            htmlFor="message"
          >
            <span>Message</span>
            <textarea
              id="message"
              value={text}
              cols="50"
              rows="5"
              onChange={(e) => setText(e.currentTarget.value)}
              maxlength="200"
              required
            />
          </label>
          <div className={styles.form__buttons}>
            <button
              ref={(el) => {
                submitRef = el;
              }}
              className={styles.form__submit}
              type="submit"
            >
              Add my message
            </button>
          </div>
        </form>

        <button
          ref={(el) => {
            cancelRef = el;
          }}
          onClick={() => handleClickClose()}
          className={styles.form__cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

export default AddForm;
