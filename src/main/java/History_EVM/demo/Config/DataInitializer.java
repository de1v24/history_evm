//package History_EVM.demo.Config;
//
//
//import History_EVM.demo.model.Computer;
//import History_EVM.demo.repository.ComputerRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//public class DataInitializer {
//
//    @Bean
//    CommandLineRunner initDatabase(ComputerRepository repository) {
//        return args -> {
//            if (repository.count() > 0) {
//                System.out.println("База данных уже содержит информацию. Инициализация пропущена");
//                return;
//            }
//            Computer mesm = new Computer(
//                    null,
//                    "МЭСМ",
//                    1950,
//                    "Сергей Лебедев",
//                    "Малая электронная счетная машина. Самая первая в СССР и континентальной Европе ЭВМ с хранимой в памяти программой. Занимала целое крыло двухэтажного здания (60 кв.м) и содержала около 6000 радиоламп. На ней проводили расчеты для термоядерного оружия и ракетостроения.",
//                    50L,
//                    2.0,
//                    25.0,
//                    "https://upload.wikimedia.org/wikipedia/commons/d/d4/MESM.jpg"
//            );
//
//            Computer ural = new Computer(
//                    null,
//                    "Урал-1",
//                    1956,
//                    "Башир Рамеев",
//                    "Первая серийная советская ЭВМ (выпущено более 180 штук). Использовалась в вычислительных центрах НИИ, на заводах и для расчетов траекторий спутников. Память работала на магнитном барабане (прототип жесткого диска).",
//                    100L,
//                    2.0,
//                    10.0,
//                    "https://upload.wikimedia.org/wikipedia/ru/8/8d/Ural_1_computer.jpg"
//            );
//
//            Computer setun = new Computer(
//                    null,
//                    "Сетунь",
//                    1959,
//                    "Николай Брусенцов",
//                    "Уникальная машина, не имеющая аналогов в мире! Работала не в двоичной (0, 1), а в ТРОИЧНОЙ системе счисления (-1, 0, 1). Благодаря этому она была невероятно надежной, дешевой в производстве и потребляла в разы меньше энергии, чем аналоги того времени.",
//                    4000L,
//                    3.0,
//                    2.5,
//                    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Setun_computer.jpg"
//            );
//
//            Computer besm6 = new Computer(
//                    null,
//                    "БЭСМ-6",
//                    1967,
//                    "Сергей Лебедев",
//                    "Легендарная супер-ЭВМ и вершина развития советской вычислительной техники. Одна из первых в мире машин, достигших производительности в 1 миллион операций в секунду. Использовалась в управлении космическими полетами «Союз — Аполлон».",
//                    1000000L,
//                    128.0,
//                    50.0,
//                    "https://upload.wikimedia.org/wikipedia/commons/1/18/Besm6.jpg"
//            );
//
//            Computer esEvm = new Computer(
//                    null,
//                    "ЕС-1020 (ЕС ЭВМ)",
//                    1971,
//                    "Виктор Пржиялковский",
//                    "Единая Система ЭВМ. Самый противоречивый этап в истории. Руководство СССР приняло решение прекратить развитие собственных уникальных архитектур и начать копировать американские ЭВМ серии IBM System/360. Это позволило стандартизировать софт, но привело к отставанию отрасли.",
//                    20000L,
//                    64.0,
//                    12.0,
//                    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/ES_1033.jpg/800px-ES_1033.jpg"
//            );
//
//            Computer agat = new Computer(
//                    null,
//                    "Агат-4",
//                    1984,
//                    "Анатолий Волков",
//                    "Первый советский серийный ПЕРСОНАЛЬНЫЙ компьютер. Широко использовался в школах для обучения информатике. Был частично совместим с американским Apple II. Имел цветной монитор и считыватель гибких магнитных дисков (дискет).",
//                    300000L,
//                    64.0,
//                    0.06, // 60 Ватт = 0.06 КВт
//                    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Agat_computer.jpg"
//            );
//
//            Computer elbrus = new Computer(
//                    null,
//                    "Эльбрус-8С (Сервер)",
//                    2014,
//                    "Александр Ким (МЦСТ)",
//                    "Современный российский 8-ядерный микропроцессор. Возврат к уникальной отечественной архитектуре — использует технологию VLIW (сверхдлинное командное слово), где компилятор сам параллелит задачи, что делает процессор очень защищенным от вирусов.",
//                    250000000000L, // 250 миллиардов оп/сек (250 GFlops)
//                    33554432.0,    // 32 ГБ ОЗУ (в килобайтах)
//                    0.09,          // 90 Ватт = 0.09 КВт
//                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Elbrus-8C_1.jpg/800px-Elbrus-8C_1.jpg"
//            );
//
//            // Сохраняем все машины в базу данных
//            repository.saveAll(List.of(mesm, ural, setun, besm6, esEvm, agat, elbrus));
//            System.out.println("Историческая база данных (7 ЭВМ) успешно загружена в PostgeSQL!");
//        };
//    }
//}