
CREATE TABLE `areas` (
  `id_area` int(11) NOT NULL,
  `nombre_area` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `visible` tinyint(1) DEFAULT 1,
  `imagen` text DEFAULT NULL,
  `enlace` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cursos`
--

INSERT INTO `cursos` (`id_curso`, `titulo`, `descripcion`, `visible`, `imagen`, `enlace`) VALUES
(1, 'Curso 1 - Fundamentos de ofimática', 'Este curso brinda habilidades básicas en el uso de procesadores de texto, hojas de cálculo y presentaciones digitales.', 1, './images/curso-ofimatica.jpg', 'curso1.html'),
(2, 'Curso 2 - Diseño web con HTML y CSS', 'En este curso, los participantes aprenderán a crear sitios web accesibles desde cero, utilizando HTML semántico y CSS para lograr diseños adaptables.', 1, './images/curso-web.png', 'curso2.html'),
(3, 'Curso 3 - Mantenimiento de computadores', 'Este curso introduce a los fundamentos del mantenimiento de equipos informáticos.', 1, './images/curso-mant.jpg', 'curso3.html');

-- --------------------------------------------------------

--
-- Table structure for table `evaluaciones`
--

CREATE TABLE `evaluaciones` (
  `id_evaluacion` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `titulo` varchar(150) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evaluaciones`
--

INSERT INTO `evaluaciones` (`id_evaluacion`, `id_curso`, `titulo`, `descripcion`) VALUES
(1, 1, 'Evaluación curso 1 - Fundamentos de ofimática', 'Evaluación básica sobre herramientas ofimáticas'),
(2, 2, 'Evaluación curso 2 - Diseño web con HTML y CSS', 'Evaluación de conocimientos básicos de diseño web'),
(3, 3, 'Evaluación curso 3 - Mantenimiento de computadores', 'Preguntas sobre hardware y sistemas operativos');

-- --------------------------------------------------------

--
-- Table structure for table `foros`
--

CREATE TABLE `foros` (
  `id_foro` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foros`
--

INSERT INTO `foros` (`id_foro`, `id_curso`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id_inscripcion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `fecha_inscripcion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materiales`
--

CREATE TABLE `materiales` (
  `id_material` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL,
  `titulo` varchar(150) DEFAULT NULL,
  `contenido` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material_topico`
--

CREATE TABLE `material_topico` (
  `id_material` int(11) NOT NULL,
  `id_topico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mensajes_foro`
--

CREATE TABLE `mensajes_foro` (
  `id_mensaje` int(11) NOT NULL,
  `id_foro` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `notas`
--

CREATE TABLE `notas` (
  `id_nota` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_evaluacion` int(11) DEFAULT NULL,
  `resultado` float DEFAULT NULL,
  `retroalimentacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opciones`
--

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL,
  `id_pregunta` int(11) DEFAULT NULL,
  `texto` text NOT NULL,
  `es_correcta` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opciones`
--

INSERT INTO `opciones` (`id_opcion`, `id_pregunta`, `texto`, `es_correcta`) VALUES
(1, 1, 'Procesar textos', 1),
(2, 1, 'Editar imágenes', 0),
(3, 1, 'Reproducir música', 0),
(4, 1, 'Navegar por internet', 0),
(5, 2, 'Microsoft Excel', 1),
(6, 2, 'Microsoft Word', 0),
(7, 2, 'Microsoft Paint', 0),
(8, 2, 'Skype', 0),
(9, 3, 'Una unidad de almacenamiento', 0),
(10, 3, 'Una parte del disco duro', 0),
(11, 3, 'Una intersección de fila y columna', 1),
(12, 3, 'Un tipo de archivo', 0),
(13, 4, 'Editar video', 0),
(14, 4, 'Crear presentaciones con diapositivas', 1),
(15, 4, 'Hacer cálculos contables', 0),
(16, 4, 'Diseñar logotipos', 0),
(17, 5, '.docx', 1),
(18, 5, '.ppt', 0),
(19, 5, '.xls', 0),
(20, 5, '.pdf', 0),
(21, 6, 'LibreOffice', 0),
(22, 6, 'Excel', 0),
(23, 6, 'PowerPoint', 0),
(24, 6, 'Photoshop', 1),
(25, 7, 'Ctrl + C', 1),
(26, 7, 'Ctrl + V', 0),
(27, 7, 'Ctrl + X', 0),
(28, 7, 'Ctrl + Z', 0),
(29, 8, 'Un documento PDF', 0),
(30, 8, 'Un conjunto de imágenes', 0),
(31, 8, 'Una secuencia de diapositivas', 1),
(32, 8, 'Una tabla de Excel', 0),
(33, 9, 'Una imagen', 0),
(34, 9, 'Una operación matemática', 1),
(35, 9, 'Una gráfica', 0),
(36, 9, 'Una animación', 0),
(37, 10, 'Ctrl + S', 0),
(38, 10, 'Ctrl + G', 1),
(39, 10, 'Ctrl + P', 0),
(40, 10, 'Ctrl + N', 0),
(41, 11, 'HyperText Markup Language', 1),
(42, 11, 'HighText Markdown Language', 0),
(43, 11, 'Home Tool Markup Language', 0),
(44, 11, 'Hyperlink Text Management Language', 0),
(45, 12, '<a>', 1),
(46, 12, '<link>', 0),
(47, 12, '<href>', 0),
(48, 12, '<src>', 0),
(49, 13, 'Cascading Style Sheets', 1),
(50, 13, 'Creative Style Sheets', 0),
(51, 13, 'Computer Style Sheets', 0),
(52, 13, 'Colorful Style Sheets', 0),
(53, 14, 'color', 1),
(54, 14, 'background-color', 0),
(55, 14, 'font-size', 0),
(56, 14, 'text-align', 0),
(57, 15, '<html><head><body>', 1),
(58, 15, '<head><body><html>', 0),
(59, 15, '<body><html><head>', 0),
(60, 15, '<html><body><head>', 0),
(61, 16, '<p>', 1),
(62, 16, '<paragraph>', 0),
(63, 16, '<text>', 0),
(64, 16, '<content>', 0),
(65, 17, 'Especificar la dirección de un enlace', 1),
(66, 17, 'Cambiar el color de fondo', 0),
(67, 17, 'Incluir una imagen', 0),
(68, 17, 'Cargar un script', 0),
(69, 18, '<link rel=\"stylesheet\" href=\"estilos.css\">', 1),
(70, 18, '<style src=\"estilos.css\">', 0),
(71, 18, '<css link=\"estilos.css\">', 0),
(72, 18, '<stylesheet href=\"estilos.css\">', 0),
(73, 19, 'px', 1),
(74, 19, 'ptx', 0),
(75, 19, 'xx', 0),
(76, 19, 'sp', 0),
(77, 20, 'text-align', 1),
(78, 20, 'align', 0),
(79, 20, 'center-text', 0),
(80, 20, 'text-position', 0),
(81, 21, 'Disco duro', 1),
(82, 21, 'RAM', 0),
(83, 21, 'Fuente de poder', 0),
(84, 21, 'CPU', 0),
(85, 22, 'Windows', 1),
(86, 22, 'Linux', 0),
(87, 22, 'MacOS', 0),
(88, 22, 'Ubuntu', 0),
(89, 23, 'Aire comprimido', 1),
(90, 23, 'Aceite', 0),
(91, 23, 'Cepillo mojado', 0),
(92, 23, 'Alcohol puro', 0),
(93, 24, 'Sistema básico de entrada y salida', 1),
(94, 24, 'Sistema operativo', 0),
(95, 24, 'Procesador', 0),
(96, 24, 'Memoria', 0),
(97, 25, 'FAT32', 1),
(98, 25, 'NTFS', 0),
(99, 25, 'PDF', 0),
(100, 25, 'DOCX', 0),
(101, 26, 'Un programa que permite que el hardware funcione con el sistema', 1),
(102, 26, 'Una pieza física del computador', 0),
(103, 26, 'Un virus', 0),
(104, 26, 'Un sistema de refrigeración', 0),
(105, 27, 'Borrar completamente un disco', 1),
(106, 27, 'Crear archivos ZIP', 0),
(107, 27, 'Cambiar la fuente de poder', 0),
(108, 27, 'Actualizar la BIOS', 0),
(109, 28, 'Linux', 1),
(110, 28, 'Windows', 0),
(111, 28, 'MacOS', 0),
(112, 28, 'DOS', 0),
(113, 29, 'Router', 1),
(114, 29, 'Fuente de poder', 0),
(115, 29, 'Mouse', 0),
(116, 29, 'USB', 0),
(117, 30, 'Archivo que contiene la copia exacta de un sistema para instalación', 1),
(118, 30, 'Foto digital de una PC', 0),
(119, 30, 'Documento de Word', 0),
(120, 30, 'Archivo PDF', 0);

-- --------------------------------------------------------

--
-- Table structure for table `preguntas`
--

CREATE TABLE `preguntas` (
  `id_pregunta` int(11) NOT NULL,
  `id_evaluacion` int(11) DEFAULT NULL,
  `texto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `preguntas`
--

INSERT INTO `preguntas` (`id_pregunta`, `id_evaluacion`, `texto`) VALUES
(1, 1, '¿Cuál es la función principal de Microsoft Word?'),
(2, 1, '¿Qué programa es ideal para crear hojas de cálculo?'),
(3, 1, '¿Qué es una celda en Excel?'),
(4, 1, '¿Qué permite hacer PowerPoint?'),
(5, 1, '¿Qué extensión tienen los archivos de Word por defecto?'),
(6, 1, '¿Cuál de los siguientes NO es un software de ofimática?'),
(7, 1, '¿Qué comando se usa para copiar texto en Word?'),
(8, 1, '¿Qué es una presentación en PowerPoint?'),
(9, 1, '¿Qué es una fórmula en Excel?'),
(10, 1, '¿Qué tecla se usa para guardar rápidamente un documento?'),
(11, 2, '¿Qué significa HTML?'),
(12, 2, '¿Qué etiqueta se usa para crear un enlace?'),
(13, 2, '¿Qué significa CSS?'),
(14, 2, '¿Qué propiedad de CSS cambia el color del texto?'),
(15, 2, '¿Cuál es la estructura básica de un documento HTML?'),
(16, 2, '¿Qué etiqueta define un párrafo?'),
(17, 2, '¿Cuál es la función del atributo href?'),
(18, 2, '¿Cuál es la forma correcta de enlazar un archivo CSS externo?'),
(19, 2, '¿Cuál de las siguientes es una unidad válida en CSS?'),
(20, 2, '¿Cuál propiedad se usa para centrar texto?'),
(21, 3, '¿Qué componente almacena datos permanentemente?'),
(22, 3, '¿Cuál es el sistema operativo más usado en computadoras personales?'),
(23, 3, '¿Qué herramienta se usa para limpiar el polvo de una PC?'),
(24, 3, '¿Qué es la BIOS?'),
(25, 3, '¿Qué formato debe tener una USB para instalar Windows?'),
(26, 3, '¿Qué es un driver o controlador?'),
(27, 3, '¿Qué es el formateo de un disco?'),
(28, 3, '¿Qué sistema operativo es de código abierto?'),
(29, 3, '¿Qué dispositivo permite la conexión a Internet?'),
(30, 3, '¿Qué es una imagen ISO?');

-- --------------------------------------------------------

--
-- Table structure for table `respuestas_usuario`
--

CREATE TABLE `respuestas_usuario` (
  `id_respuesta` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `id_opcion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



--
-- Table structure for table `resultados`
--

CREATE TABLE `resultados` (
  `id_resultado` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `puntaje_obtenido` float NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(1, 'admin', 'Administrador general del sistema'),
(2, 'tutor', 'Tutor asignado a los cursos y tutorías'),
(3, 'estudiante', 'Usuario común registrado por formulario');

-- --------------------------------------------------------

--
-- Table structure for table `solicitudes_tutoria`
--

CREATE TABLE `solicitudes_tutoria` (
  `id_solicitud` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `mensaje` text DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `asignada` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `topicos`
--

CREATE TABLE `topicos` (
  `id_topico` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `genero` varchar(20) DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  `celular` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_area`);

--
-- Indexes for table `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indexes for table `evaluaciones`
--
ALTER TABLE `evaluaciones`
  ADD PRIMARY KEY (`id_evaluacion`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indexes for table `foros`
--
ALTER TABLE `foros`
  ADD PRIMARY KEY (`id_foro`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indexes for table `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`id_inscripcion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indexes for table `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`id_material`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_area` (`id_area`);

--
-- Indexes for table `material_topico`
--
ALTER TABLE `material_topico`
  ADD PRIMARY KEY (`id_material`,`id_topico`),
  ADD KEY `id_topico` (`id_topico`);

--
-- Indexes for table `mensajes_foro`
--
ALTER TABLE `mensajes_foro`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id_foro` (`id_foro`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id_nota`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_evaluacion` (`id_evaluacion`);

--
-- Indexes for table `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id_opcion`),
  ADD KEY `id_pregunta` (`id_pregunta`);

--
-- Indexes for table `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id_pregunta`),
  ADD KEY `id_evaluacion` (`id_evaluacion`);

--
-- Indexes for table `respuestas_usuario`
--
ALTER TABLE `respuestas_usuario`
  ADD PRIMARY KEY (`id_respuesta`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_pregunta` (`id_pregunta`),
  ADD KEY `id_opcion` (`id_opcion`);

--
-- Indexes for table `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id_resultado`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_evaluacion` (`id_evaluacion`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `solicitudes_tutoria`
--
ALTER TABLE `solicitudes_tutoria`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indexes for table `topicos`
--
ALTER TABLE `topicos`
  ADD PRIMARY KEY (`id_topico`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `evaluaciones`
--
ALTER TABLE `evaluaciones`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `foros`
--
ALTER TABLE `foros`
  MODIFY `id_foro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materiales`
--
ALTER TABLE `materiales`
  MODIFY `id_material` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mensajes_foro`
--
ALTER TABLE `mensajes_foro`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `notas`
--
ALTER TABLE `notas`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id_opcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT for table `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `respuestas_usuario`
--
ALTER TABLE `respuestas_usuario`
  MODIFY `id_respuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id_resultado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `solicitudes_tutoria`
--
ALTER TABLE `solicitudes_tutoria`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `topicos`
--
ALTER TABLE `topicos`
  MODIFY `id_topico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `evaluaciones`
--
ALTER TABLE `evaluaciones`
  ADD CONSTRAINT `evaluaciones_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

--
-- Constraints for table `foros`
--
ALTER TABLE `foros`
  ADD CONSTRAINT `foros_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

--
-- Constraints for table `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

--
-- Constraints for table `materiales`
--
ALTER TABLE `materiales`
  ADD CONSTRAINT `materiales_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`),
  ADD CONSTRAINT `materiales_ibfk_2` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`);

--
-- Constraints for table `material_topico`
--
ALTER TABLE `material_topico`
  ADD CONSTRAINT `material_topico_ibfk_1` FOREIGN KEY (`id_material`) REFERENCES `materiales` (`id_material`),
  ADD CONSTRAINT `material_topico_ibfk_2` FOREIGN KEY (`id_topico`) REFERENCES `topicos` (`id_topico`);

--
-- Constraints for table `mensajes_foro`
--
ALTER TABLE `mensajes_foro`
  ADD CONSTRAINT `mensajes_foro_ibfk_1` FOREIGN KEY (`id_foro`) REFERENCES `foros` (`id_foro`),
  ADD CONSTRAINT `mensajes_foro_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Constraints for table `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `notas_ibfk_2` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluaciones` (`id_evaluacion`);

--
-- Constraints for table `opciones`
--
ALTER TABLE `opciones`
  ADD CONSTRAINT `opciones_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`);

--
-- Constraints for table `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluaciones` (`id_evaluacion`);

--
-- Constraints for table `respuestas_usuario`
--
ALTER TABLE `respuestas_usuario`
  ADD CONSTRAINT `respuestas_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `respuestas_usuario_ibfk_3` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`),
  ADD CONSTRAINT `respuestas_usuario_ibfk_4` FOREIGN KEY (`id_opcion`) REFERENCES `opciones` (`id_opcion`);

--
-- Constraints for table `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluaciones` (`id_evaluacion`);

--
-- Constraints for table `solicitudes_tutoria`
--
ALTER TABLE `solicitudes_tutoria`
  ADD CONSTRAINT `solicitudes_tutoria_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

