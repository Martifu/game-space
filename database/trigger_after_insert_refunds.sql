CREATE DEFINER=`atiadmin_utt`@`%` TRIGGER `atiadmin_game_space`.`Refunds_BEFORE_INSERT` BEFORE INSERT ON `Refunds` FOR EACH ROW
BEGIN
	DECLARE total DOUBLE;
	SET @total := (SELECT total FROM atiadmin_game_space.Orders WHERE id = NEW.Orders_id);
    set NEW.monto := $total;
    UPDATE `atiadmin_game_space`.`Orders` SET `status` = 'canceled' WHERE `id` = NEW.Orders_id;
END