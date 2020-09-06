--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Ubuntu 12.2-4)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: jeremiah_brem
--

CREATE TABLE public.books (
    id integer NOT NULL,
    isbn character varying(30) NOT NULL,
    title text NOT NULL,
    synopsis text,
    genre character varying(30),
    author character varying(50),
    publish_date integer,
    info_url text,
    price money,
    read_date character varying(7)
);


ALTER TABLE public.books OWNER TO jeremiah_brem;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: jeremiah_brem
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO jeremiah_brem;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jeremiah_brem
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: meetings; Type: TABLE; Schema: public; Owner: jeremiah_brem
--

CREATE TABLE public.meetings (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    description text,
    link text
);


ALTER TABLE public.meetings OWNER TO jeremiah_brem;

--
-- Name: meetings_id_seq; Type: SEQUENCE; Schema: public; Owner: jeremiah_brem
--

CREATE SEQUENCE public.meetings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meetings_id_seq OWNER TO jeremiah_brem;

--
-- Name: meetings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jeremiah_brem
--

ALTER SEQUENCE public.meetings_id_seq OWNED BY public.meetings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: jeremiah_brem
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    password text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO jeremiah_brem;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: jeremiah_brem
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO jeremiah_brem;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jeremiah_brem
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: meetings id; Type: DEFAULT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.meetings ALTER COLUMN id SET DEFAULT nextval('public.meetings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: jeremiah_brem
--

COPY public.books (id, isbn, title, synopsis, genre, author, publish_date, info_url, price, read_date) FROM stdin;
7	9781524761332	Ready Player Two	The highly anticipated sequel to the beloved worldwide bestseller Ready Player One, the "ridiculously fun and large-hearted" (NPR) near-future adventure that inspired the blockbuster Steven Spielberg film.	Science Fiction	Ernest Cline	2020	https://openlibrary.org/books/OL28337503M/Ready_Player_Two	\N	2020-10
8	9780593188064	Tom Clancy Firing Point	Jack Ryan, Jr. is out to avenge the murder of an old friend, but the vein of evil he's tapped into may run too deep for him to handle in the latest electric entry in the #1 New York Times bestselling series.	Action & Adventure	Tom Clancy	2020	https://openlibrary.org/books/OL28237126M/Tom_Clancy_Firing_Point	\N	2020-11
1	9781338635171	The Ballad Of Songbirds And Snakes	Set against the backdrop of the 10th Hunger Games, The Ballad of Songbirds and Snakes revolves around the adventures of a teenage Coriolanus Snow, who would become the dictatorial president of the fictional nation of Panem by the events of the original trilogy. With his family on the brink of poverty, Coriolanus is tasked with mentoring District 12 tribute Lucy Gray Baird for his one shot at glory.	Dystopian	Suzanne Collins	2020	https://openlibrary.org/books/OL28313761M/The_Ballad_Of_Songbirds_And_Snakes	\N	2020-07
3	9781101974490	The Andromeda Strain	A military space probe, sent to collect extraterrestrial organisms from the upper atmosphere, is knocked out of orbit and falls to Earth. Twelve miles from the crash site, an inexplicable and deadly phenomenon terrorizes the residents of a sleepy desert town in Arizona, leaving only two survivors: an elderly addict and a newborn infant.	Thrillers & Suspense	Michael Crichton	2017	https://openlibrary.org/books/OL26824947M/The_Andromeda_Strain	\N	2020-06
4	9781982110567	The Institute	As psychically terrifying as Firestarter, and with the spectacular kid power of It, The Institute is Stephen King’s gut-wrenchingly dramatic story of good vs. evil in a world where the good guys don’t always win.	Thrillers & Suspense	Stephen King	2019	https://openlibrary.org/books/OL27306907M/The_Institute	\N	2020-05
5	9781501195068	The Jackal	The location of the glymera’s notorious prison camp was lost after the raids. When a freak accident provides Nyx clues to where her sister may still be doing time, she becomes determined to find the secret subterranean labyrinth. Embarking on a journey under the earth, she learns a terrible truth—and meets a male who changes everything forever.	Romance	J.R. Ward	2020	https://openlibrary.org/books/OL28129910M/The_Jackal	\N	2020-08
6	9780765326386	Rhythm of War	The Stormlight Archive saga continues in Rhythm of War, the eagerly awaited sequel to Brandon Sanderson's number one New York Times best-selling Oathbringer, from an epic fantasy writer at the top of his game. 	Action & Adventure	Brandon Sanderson	2020	https://openlibrary.org/books/OL28217699M/Rhythm_of_War	\N	2020-09
\.


--
-- Data for Name: meetings; Type: TABLE DATA; Schema: public; Owner: jeremiah_brem
--

COPY public.meetings (id, date, description, link) FROM stdin;
16	2020-07-01 19:00:00	{"blocks":[{"key":"4k2mk","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
20	2020-05-01 19:30:00	{"blocks":[{"key":"970gm","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
21	2020-08-01 19:00:00	{"blocks":[{"key":"3t7dc","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
14	2020-04-01 18:30:00	{"blocks":[{"key":"9mra2","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
19	2020-03-01 18:00:00	{"blocks":[{"key":"3gqpq","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
15	2020-02-01 19:00:00	{"blocks":[{"key":"eqaoj","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
17	2020-01-01 18:00:00	{"blocks":[{"key":"2ol9h","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
18	2019-12-01 19:00:00	{"blocks":[{"key":"2i47s","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
24	2020-11-01 18:30:00	{"blocks":[{"key":"ese97","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
13	2020-06-01 19:00:00	{"blocks":[{"key":"2jnsi","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://testlink.com
23	2020-10-01 19:01:00	{"blocks":[{"key":"1t9kp","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":4,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
11	2020-09-01 19:30:00	{"blocks":[{"key":"ant46","text":"A long time ago, in galaxy far, far away, there lived the Jedi, sworn to protect the Republic. Unfortunately, they were about to be sabotaged by the evil Emperor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":58,"length":6,"style":"BOLD"},{"offset":85,"length":8,"style":"BOLD"},{"offset":154,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}	http://example.com
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jeremiah_brem
--

COPY public.users (id, username, password, is_admin) FROM stdin;
1	admin	$2b$12$./eJnqPHlJXNxC5W95ksleU4NGk6CwyzKylZWb8JNLcwnwhYivHIK	t
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jeremiah_brem
--

SELECT pg_catalog.setval('public.books_id_seq', 8, true);


--
-- Name: meetings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jeremiah_brem
--

SELECT pg_catalog.setval('public.meetings_id_seq', 24, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jeremiah_brem
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: books books_isbn_key; Type: CONSTRAINT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_isbn_key UNIQUE (isbn);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: meetings meetings_pkey; Type: CONSTRAINT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.meetings
    ADD CONSTRAINT meetings_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: jeremiah_brem
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

