import React, { useState, useCallback } from "react";

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(
    () => setModalVisible(false),
    [setModalVisible]
  );

  return { modalVisible, showModal, hideModal };
};
