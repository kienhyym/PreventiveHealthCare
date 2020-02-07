--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)

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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: baiviet; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baiviet (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ngaytao timestamp without time zone,
    tieude character varying,
    gioithieu character varying,
    noidung text,
    phamvi character varying(20)
);


ALTER TABLE public.baiviet OWNER TO ytdpuser;

--
-- Name: baiviet_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baiviet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baiviet_id_seq OWNER TO ytdpuser;

--
-- Name: baiviet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baiviet_id_seq OWNED BY public.baiviet.id;


--
-- Name: bangdaotaocanbo; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangdaotaocanbo (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    hinhthucdaotao character varying,
    soluong integer,
    vesinhdichte integer,
    ytecongdong integer,
    xetnghiem integer,
    ngoaingu integer,
    khac integer
);


ALTER TABLE public.bangdaotaocanbo OWNER TO ytdpuser;

--
-- Name: bangdaotaocanbo_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangdaotaocanbo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangdaotaocanbo_id_seq OWNER TO ytdpuser;

--
-- Name: bangdaotaocanbo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangdaotaocanbo_id_seq OWNED BY public.bangdaotaocanbo.id;


--
-- Name: bangdichbenh; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangdichbenh (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    cuakhau_id integer,
    tencuakhau character varying,
    macuakhau character varying(25),
    sothutu smallint,
    db_csbc integer,
    db_dvdtc integer,
    db_dvkd integer,
    db_mdc integer,
    db_mdm integer,
    db_sldtc integer,
    db_slgs integer,
    db_sxdtc integer,
    db_sxkd integer,
    db_mdc_slgs integer,
    db_mdc_slxl integer,
    db_csbc_slgs integer,
    db_csbc_slxl integer,
    db_mdm_slgs integer,
    db_mdm_slxl integer,
    db_csdv_slgs integer,
    db_csdv_sld integer,
    db_cssx_slgs integer,
    db_cssx_sld integer
);


ALTER TABLE public.bangdichbenh OWNER TO ytdpuser;

--
-- Name: bangdichbenh_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangdichbenh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangdichbenh_id_seq OWNER TO ytdpuser;

--
-- Name: bangdichbenh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangdichbenh_id_seq OWNED BY public.bangdichbenh.id;


--
-- Name: banghanghoa; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.banghanghoa (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    cuakhau_id integer,
    tencuakhau character varying,
    macuakhau character varying(25),
    sothutu smallint,
    hh_nc_bpbk_sl integer,
    hh_nc_bpbk_skt integer,
    hh_nc_bpbk_sxl integer,
    hh_nc_hhk_tl double precision,
    hh_nc_hhk_skt integer,
    hh_nc_hhk_sxl integer,
    hh_nc_ghichu character varying,
    hh_xc_bpbk_sl integer,
    hh_xc_bpbk_skt integer,
    hh_xc_bpbk_sxl integer,
    hh_xc_hhk_tl double precision,
    hh_xc_hhk_skt integer,
    hh_xc_hhk_sxl integer,
    hh_xc_ghichu character varying,
    hh_qc_bpbk_sl integer,
    hh_qc_bpbk_skt integer,
    hh_qc_bpbk_sxl integer,
    hh_qc_hhk_tl double precision,
    hh_qc_hhk_skt integer,
    hh_qc_hhk_sxl integer,
    hh_qc_ghichu character varying
);


ALTER TABLE public.banghanghoa OWNER TO ytdpuser;

--
-- Name: banghanghoa_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.banghanghoa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banghanghoa_id_seq OWNER TO ytdpuser;

--
-- Name: banghanghoa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.banghanghoa_id_seq OWNED BY public.banghanghoa.id;


--
-- Name: banghoptacquocte; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.banghoptacquocte (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    quocgia character varying,
    noidung character varying
);


ALTER TABLE public.banghoptacquocte OWNER TO ytdpuser;

--
-- Name: banghoptacquocte_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.banghoptacquocte_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banghoptacquocte_id_seq OWNER TO ytdpuser;

--
-- Name: banghoptacquocte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.banghoptacquocte_id_seq OWNED BY public.banghoptacquocte.id;


--
-- Name: bangkinhphi; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangkinhphi (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    nguonkinhphi character varying,
    kinhphi double precision
);


ALTER TABLE public.bangkinhphi OWNER TO ytdpuser;

--
-- Name: bangkinhphi_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangkinhphi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangkinhphi_id_seq OWNER TO ytdpuser;

--
-- Name: bangkinhphi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangkinhphi_id_seq OWNED BY public.bangkinhphi.id;


--
-- Name: bangnghiencuukhoahoc; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangnghiencuukhoahoc (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    tendetai character varying,
    thoigianthuchien character varying,
    detaicap character varying,
    linhvucnghiencuu character varying
);


ALTER TABLE public.bangnghiencuukhoahoc OWNER TO ytdpuser;

--
-- Name: bangnghiencuukhoahoc_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangnghiencuukhoahoc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangnghiencuukhoahoc_id_seq OWNER TO ytdpuser;

--
-- Name: bangnghiencuukhoahoc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangnghiencuukhoahoc_id_seq OWNED BY public.bangnghiencuukhoahoc.id;


--
-- Name: bangnguoi; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangnguoi (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    cuakhau_id integer,
    tencuakhau character varying,
    macuakhau character varying(25),
    sothutu smallint,
    ng_nc_sl1 integer,
    ng_nc_sl2 integer,
    ng_nc_ts1 integer,
    ng_nc_ts2 integer,
    ng_nc_ghichu character varying,
    ng_xc_sl1 integer,
    ng_xc_sl2 integer,
    ng_xc_ts1 integer,
    ng_xc_ts2 integer,
    ng_xc_ghichu character varying,
    ng_qc_sl1 integer,
    ng_qc_sl2 integer,
    ng_qc_ts1 integer,
    ng_qc_ts2 integer,
    ng_qc_ghichu character varying
);


ALTER TABLE public.bangnguoi OWNER TO ytdpuser;

--
-- Name: bangnguoi_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangnguoi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangnguoi_id_seq OWNER TO ytdpuser;

--
-- Name: bangnguoi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangnguoi_id_seq OWNED BY public.bangnguoi.id;


--
-- Name: bangphuongtien; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangphuongtien (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    cuakhau_id integer,
    tencuakhau character varying,
    macuakhau character varying(25),
    sothutu smallint,
    pt_nc_hk_sl integer,
    pt_nc_hk_skt integer,
    pt_nc_hk_sxl integer,
    pt_nc_db_sl integer,
    pt_nc_db_skt integer,
    pt_nc_db_sxl integer,
    pt_nc_dt_sl integer,
    pt_nc_dt_skt integer,
    pt_nc_dt_sxl integer,
    pt_nc_ghichu character varying,
    pt_xc_ghichu character varying,
    pt_qc_ghichu character varying,
    pt_nc_ds_sl integer,
    pt_nc_ds_skt integer,
    pt_nc_ds_sxl integer,
    pt_xc_hk_sl integer,
    pt_xc_hk_skt integer,
    pt_xc_hk_sxl integer,
    pt_xc_db_sl integer,
    pt_xc_db_skt integer,
    pt_xc_db_sxl integer,
    pt_xc_dt_sl integer,
    pt_xc_dt_skt integer,
    pt_xc_dt_sxl integer,
    pt_xc_ds_sl integer,
    pt_xc_ds_skt integer,
    pt_xc_ds_sxl integer,
    pt_qc_hk_sl integer,
    pt_qc_hk_skt integer,
    pt_qc_hk_sxl integer,
    pt_qc_db_sl integer,
    pt_qc_db_skt integer,
    pt_qc_db_sxl integer,
    pt_qc_dt_sl integer,
    pt_qc_dt_skt integer,
    pt_qc_dt_sxl integer,
    pt_qc_ds_sl integer,
    pt_qc_ds_skt integer,
    pt_qc_ds_sxl integer
);


ALTER TABLE public.bangphuongtien OWNER TO ytdpuser;

--
-- Name: bangphuongtien_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangphuongtien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangphuongtien_id_seq OWNER TO ytdpuser;

--
-- Name: bangphuongtien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangphuongtien_id_seq OWNED BY public.bangphuongtien.id;


--
-- Name: bangthithe; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangthithe (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    cuakhau_id integer,
    tencuakhau character varying,
    macuakhau character varying(25),
    sothutu smallint,
    tt_nc_tt_sl integer,
    tt_nc_tt_skt integer,
    tt_nc_tt_sxl integer,
    tt_nc_hc_sl integer,
    tt_nc_hc_skt integer,
    tt_nc_hc_sxl integer,
    tt_nc_tc_sl integer,
    tt_nc_tc_skt integer,
    tt_nc_tc_sxl integer,
    tt_xc_tt_sl integer,
    tt_xc_tt_skt integer,
    tt_xc_tt_sxl integer,
    tt_xc_hc_sl integer,
    tt_xc_hc_skt integer,
    tt_xc_hc_sxl integer,
    tt_xc_tc_sl integer,
    tt_xc_tc_skt integer,
    tt_xc_tc_sxl integer,
    tt_qc_tt_sl integer,
    tt_qc_tt_skt integer,
    tt_qc_tt_sxl integer,
    tt_qc_hc_sl integer,
    tt_qc_hc_skt integer,
    tt_qc_hc_sxl integer,
    tt_qc_tc_sl integer,
    tt_qc_tc_skt integer,
    tt_qc_tc_sxl integer,
    tt_nc_ghichu character varying,
    tt_xc_ghichu character varying,
    tt_qc_ghichu character varying
);


ALTER TABLE public.bangthithe OWNER TO ytdpuser;

--
-- Name: bangthithe_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangthithe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangthithe_id_seq OWNER TO ytdpuser;

--
-- Name: bangthithe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangthithe_id_seq OWNED BY public.bangthithe.id;


--
-- Name: bangtiemchung; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangtiemchung (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    tenbenh character varying,
    tenvacxin character varying,
    soluong integer,
    ghichu character varying
);


ALTER TABLE public.bangtiemchung OWNER TO ytdpuser;

--
-- Name: bangtiemchung_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangtiemchung_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangtiemchung_id_seq OWNER TO ytdpuser;

--
-- Name: bangtiemchung_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangtiemchung_id_seq OWNED BY public.bangtiemchung.id;


--
-- Name: bangtrinhdochuyenmon; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangtrinhdochuyenmon (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    tenbophan character varying,
    y_tiensy integer,
    y_thacsy integer,
    y_cunhan integer,
    y_ysy integer,
    y_dieuduong integer,
    y_kythuatvien integer,
    y_khac integer,
    duoc_daihoc integer,
    duoc_trunghoc integer,
    duoc_duocta integer,
    nganhkhac_daihoc integer,
    nganhkhac_trunghoc integer,
    nganhkhac_khac integer
);


ALTER TABLE public.bangtrinhdochuyenmon OWNER TO ytdpuser;

--
-- Name: bangtrinhdochuyenmon_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangtrinhdochuyenmon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangtrinhdochuyenmon_id_seq OWNER TO ytdpuser;

--
-- Name: bangtrinhdochuyenmon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangtrinhdochuyenmon_id_seq OWNED BY public.bangtrinhdochuyenmon.id;


--
-- Name: bangtruyenthong; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangtruyenthong (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    hinhthuc character varying,
    noidung character varying,
    doituong character varying,
    ketqua integer
);


ALTER TABLE public.bangtruyenthong OWNER TO ytdpuser;

--
-- Name: bangtruyenthong_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangtruyenthong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangtruyenthong_id_seq OWNER TO ytdpuser;

--
-- Name: bangtruyenthong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangtruyenthong_id_seq OWNED BY public.bangtruyenthong.id;


--
-- Name: bangviencanbo; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangviencanbo (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    trinhdochuyenmon character varying,
    soluongchuyentrach integer,
    soluongkiemnhiem integer
);


ALTER TABLE public.bangviencanbo OWNER TO ytdpuser;

--
-- Name: bangviencanbo_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangviencanbo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangviencanbo_id_seq OWNER TO ytdpuser;

--
-- Name: bangviencanbo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangviencanbo_id_seq OWNED BY public.bangviencanbo.id;


--
-- Name: bangvienhoatdongchung; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangvienhoatdongchung (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    noidung character varying,
    sothutu smallint,
    tenhoatdong character varying,
    soluong integer
);


ALTER TABLE public.bangvienhoatdongchung OWNER TO ytdpuser;

--
-- Name: bangvienhoatdongchung_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangvienhoatdongchung_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangvienhoatdongchung_id_seq OWNER TO ytdpuser;

--
-- Name: bangvienhoatdongchung_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangvienhoatdongchung_id_seq OWNED BY public.bangvienhoatdongchung.id;


--
-- Name: bangviensukien; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangviensukien (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    tensukien character varying,
    diadiem character varying,
    bienphap character varying,
    ketqua character varying
);


ALTER TABLE public.bangviensukien OWNER TO ytdpuser;

--
-- Name: bangviensukien_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangviensukien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangviensukien_id_seq OWNER TO ytdpuser;

--
-- Name: bangviensukien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangviensukien_id_seq OWNED BY public.bangviensukien.id;


--
-- Name: bangvssh; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangvssh (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    cuakhau_id integer,
    tencuakhau character varying,
    macuakhau character varying(25),
    sothutu smallint,
    vssh_nc_vs_sl integer,
    vssh_nc_vs_skt integer,
    vssh_nc_vs_sxl integer,
    vssh_nc_sh_sl integer,
    vssh_nc_sh_skt integer,
    vssh_nc_sh_sxl integer,
    vssh_nc_mo_sl integer,
    vssh_nc_mo_skt integer,
    vssh_nc_mo_sxl integer,
    vssh_xc_vs_sl integer,
    vssh_xc_vs_skt integer,
    vssh_xc_vs_sxl integer,
    vssh_xc_sh_sl integer,
    vssh_xc_sh_skt integer,
    vssh_xc_sh_sxl integer,
    vssh_xc_mo_sl integer,
    vssh_xc_mo_skt integer,
    vssh_xc_mo_sxl integer,
    vssh_qc_vs_sl integer,
    vssh_qc_vs_skt integer,
    vssh_qc_vs_sxl integer,
    vssh_qc_sh_sl integer,
    vssh_qc_sh_skt integer,
    vssh_qc_sh_sxl integer,
    vssh_qc_mo_sl integer,
    vssh_qc_mo_skt integer,
    vssh_qc_mo_sxl integer,
    vssh_nc_ghichu character varying,
    vssh_xc_ghichu character varying,
    vssh_qc_ghichu character varying
);


ALTER TABLE public.bangvssh OWNER TO ytdpuser;

--
-- Name: bangvssh_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangvssh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangvssh_id_seq OWNER TO ytdpuser;

--
-- Name: bangvssh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangvssh_id_seq OWNED BY public.bangvssh.id;


--
-- Name: bangxetnghiem; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.bangxetnghiem (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    sothutu smallint,
    loaixetnghiem character varying,
    soluongmau integer,
    dattieuchuan integer,
    ghichu character varying
);


ALTER TABLE public.bangxetnghiem OWNER TO ytdpuser;

--
-- Name: bangxetnghiem_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.bangxetnghiem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bangxetnghiem_id_seq OWNER TO ytdpuser;

--
-- Name: bangxetnghiem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.bangxetnghiem_id_seq OWNED BY public.bangxetnghiem.id;


--
-- Name: baocao; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocao (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ngaybaocao timestamp without time zone,
    loaikybaocao integer NOT NULL,
    loaibaocao smallint,
    kybaocao smallint NOT NULL,
    nambaocao integer NOT NULL,
    tungay date,
    denngay date,
    donvi_id integer,
    cuakhau_id integer,
    nhanxetnguoi character varying,
    nhanxetphuongtien character varying,
    nhanxethanghoa character varying,
    nhanxetthithe character varying,
    nhanxetvssh character varying,
    nhanxet character varying,
    kiennghi character varying,
    hoatdongkhac character varying,
    nhanlucts integer,
    nhanlucbienche integer,
    nhanluchopdong integer,
    tinhtrang smallint NOT NULL
);


ALTER TABLE public.baocao OWNER TO ytdpuser;

--
-- Name: baocao_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocao_id_seq OWNER TO ytdpuser;

--
-- Name: baocao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocao_id_seq OWNED BY public.baocao.id;


--
-- Name: baocaonghingonhiembenh; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocaonghingonhiembenh (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ngaybaocao timestamp without time zone,
    noibaocao character varying(255),
    nambaocao integer NOT NULL,
    donvi_id integer,
    hoten character varying,
    gioitinh character varying(20),
    namsinh integer,
    quoctich character varying,
    cmtnd character varying,
    cuakhau_nhapquacanh character varying,
    gio_nhapquacanh integer,
    ngay_nhapquacanh timestamp without time zone,
    phuongtien character varying,
    sohieu_phuongtien character varying,
    noio character varying,
    diachi_lienlac character varying,
    email character varying,
    dienthoai character varying(63),
    benh_nghingo character varying,
    tiensu_dichte character varying,
    tiensu_ngaykhoiphat timestamp without time zone,
    tiensu_trieuchunglamsang character varying,
    tiensu_chandoan character varying,
    tiensu_xutri character varying,
    noitiepnhan_xutri character varying,
    nhanxet_danhgia character varying,
    tinhtrang smallint NOT NULL
);


ALTER TABLE public.baocaonghingonhiembenh OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenh_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocaonghingonhiembenh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocaonghingonhiembenh_id_seq OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocaonghingonhiembenh_id_seq OWNED BY public.baocaonghingonhiembenh.id;


--
-- Name: baocaonghingonhiembenhnguoitiepxuc; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocaonghingonhiembenhnguoitiepxuc (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    hoten character varying,
    quoctich character varying,
    cmtnd character varying,
    dienthoai character varying,
    email character varying
);


ALTER TABLE public.baocaonghingonhiembenhnguoitiepxuc OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhnguoitiepxuc_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocaonghingonhiembenhnguoitiepxuc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocaonghingonhiembenhnguoitiepxuc_id_seq OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhnguoitiepxuc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocaonghingonhiembenhnguoitiepxuc_id_seq OWNED BY public.baocaonghingonhiembenhnguoitiepxuc.id;


--
-- Name: baocaonghingonhiembenhquocgia; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocaonghingonhiembenhquocgia (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    tenquocgia character varying,
    ngaydiqua timestamp without time zone
);


ALTER TABLE public.baocaonghingonhiembenhquocgia OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhquocgia_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocaonghingonhiembenhquocgia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocaonghingonhiembenhquocgia_id_seq OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhquocgia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocaonghingonhiembenhquocgia_id_seq OWNED BY public.baocaonghingonhiembenhquocgia.id;


--
-- Name: baocaonghingonhiembenhvacxin; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocaonghingonhiembenhvacxin (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    tenvacxin character varying,
    solandung smallint,
    ngaydunggannhat timestamp without time zone,
    ketqua character varying
);


ALTER TABLE public.baocaonghingonhiembenhvacxin OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhvacxin_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocaonghingonhiembenhvacxin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocaonghingonhiembenhvacxin_id_seq OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhvacxin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocaonghingonhiembenhvacxin_id_seq OWNED BY public.baocaonghingonhiembenhvacxin.id;


--
-- Name: baocaonghingonhiembenhxetnghiem; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocaonghingonhiembenhxetnghiem (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    baocao_id integer,
    loaimauxetnghiem character varying,
    ngaylay timestamp without time zone,
    ketqua character varying
);


ALTER TABLE public.baocaonghingonhiembenhxetnghiem OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhxetnghiem_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocaonghingonhiembenhxetnghiem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocaonghingonhiembenhxetnghiem_id_seq OWNER TO ytdpuser;

--
-- Name: baocaonghingonhiembenhxetnghiem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocaonghingonhiembenhxetnghiem_id_seq OWNED BY public.baocaonghingonhiembenhxetnghiem.id;


--
-- Name: baocaotonghopnghingonhiembenhnhoma; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocaotonghopnghingonhiembenhnhoma (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ngaybaocao bigint,
    donvi_id integer NOT NULL,
    tendonvi character varying,
    cuakhau_id integer,
    tencuakhau character varying,
    macuakhau character varying(25),
    sohanhkhach integer,
    sochuyenbay integer
);


ALTER TABLE public.baocaotonghopnghingonhiembenhnhoma OWNER TO ytdpuser;

--
-- Name: baocaotonghopnghingonhiembenhnhoma_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocaotonghopnghingonhiembenhnhoma_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocaotonghopnghingonhiembenhnhoma_id_seq OWNER TO ytdpuser;

--
-- Name: baocaotonghopnghingonhiembenhnhoma_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocaotonghopnghingonhiembenhnhoma_id_seq OWNED BY public.baocaotonghopnghingonhiembenhnhoma.id;


--
-- Name: baocaovien; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.baocaovien (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ngaybaocao timestamp without time zone,
    kybaocao smallint NOT NULL,
    nambaocao integer NOT NULL,
    tungay date,
    denngay date,
    donvi_id integer,
    danhgia character varying,
    kiennghivien character varying,
    kiennghidonvi character varying,
    tinhtrang smallint NOT NULL
);


ALTER TABLE public.baocaovien OWNER TO ytdpuser;

--
-- Name: baocaovien_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.baocaovien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baocaovien_id_seq OWNER TO ytdpuser;

--
-- Name: baocaovien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.baocaovien_id_seq OWNED BY public.baocaovien.id;


--
-- Name: benh; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.benh (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ten character varying(255) NOT NULL
);


ALTER TABLE public.benh OWNER TO ytdpuser;

--
-- Name: benh_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.benh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.benh_id_seq OWNER TO ytdpuser;

--
-- Name: benh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.benh_id_seq OWNED BY public.benh.id;


--
-- Name: cuakhau; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.cuakhau (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ten character varying(255) NOT NULL,
    kiemdichyte boolean,
    phongcachly boolean,
    nguoilienlac character varying(255),
    sodienthoai character varying,
    diachi character varying,
    email character varying,
    donvi_id integer,
    tinhthanh_id integer,
    thutu integer,
    duongboquocte boolean,
    duongbochinh boolean,
    duongbophu boolean,
    duongsat boolean,
    duonghangkhong boolean,
    duongthuyloai1 boolean,
    duongthuyloai2 boolean,
    quocgia_tiepgiap character varying,
    cuakhau_tiepgiap character varying
);


ALTER TABLE public.cuakhau OWNER TO ytdpuser;

--
-- Name: cuakhau_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.cuakhau_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cuakhau_id_seq OWNER TO ytdpuser;

--
-- Name: cuakhau_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.cuakhau_id_seq OWNED BY public.cuakhau.id;


--
-- Name: danhsachnghingonhiembenhnhoma; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.danhsachnghingonhiembenhnhoma (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    sothutu integer,
    hoten character varying,
    namsinh integer,
    gioitinh character varying,
    noiden character varying,
    quoctich character varying,
    ngaygio_phathien character varying,
    tinhtrang character varying,
    huongxuly character varying,
    baocao_id integer
);


ALTER TABLE public.danhsachnghingonhiembenhnhoma OWNER TO ytdpuser;

--
-- Name: danhsachnghingonhiembenhnhoma_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.danhsachnghingonhiembenhnhoma_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.danhsachnghingonhiembenhnhoma_id_seq OWNER TO ytdpuser;

--
-- Name: danhsachnghingonhiembenhnhoma_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.danhsachnghingonhiembenhnhoma_id_seq OWNED BY public.danhsachnghingonhiembenhnhoma.id;


--
-- Name: donvi; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.donvi (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ten character varying(255) NOT NULL,
    sodienthoai character varying(63),
    diachi character varying(255),
    email character varying(255),
    ghichu character varying(255),
    vungmien smallint,
    tinhthanh_id integer,
    tuyendonvi smallint NOT NULL,
    coquanchuquan character varying(255),
    parent_id integer,
    loaidonvi smallint,
    giamdoc character varying,
    sdtgiamdoc character varying,
    emailgiamdoc character varying,
    phogiamdoc character varying,
    sdtphogiamdoc character varying,
    emailphogiamdoc character varying
);


ALTER TABLE public.donvi OWNER TO ytdpuser;

--
-- Name: donvi_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.donvi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.donvi_id_seq OWNER TO ytdpuser;

--
-- Name: donvi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.donvi_id_seq OWNED BY public.donvi.id;


--
-- Name: faq; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.faq (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    tieude character varying,
    noidung character varying
);


ALTER TABLE public.faq OWNER TO ytdpuser;

--
-- Name: faq_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_id_seq OWNER TO ytdpuser;

--
-- Name: faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.faq_id_seq OWNED BY public.faq.id;


--
-- Name: permission; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.permission (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    role_id integer,
    model character varying,
    canread boolean,
    cancreate boolean,
    canupdate boolean,
    candelete boolean,
    cancreateown boolean,
    canupdateown boolean,
    candeleteown boolean
);


ALTER TABLE public.permission OWNER TO ytdpuser;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_id_seq OWNER TO ytdpuser;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: quanhuyen; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.quanhuyen (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ten character varying(255) NOT NULL,
    tinhthanh_id integer
);


ALTER TABLE public.quanhuyen OWNER TO ytdpuser;

--
-- Name: quanhuyen_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.quanhuyen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quanhuyen_id_seq OWNER TO ytdpuser;

--
-- Name: quanhuyen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.quanhuyen_id_seq OWNED BY public.quanhuyen.id;


--
-- Name: quocgia; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.quocgia (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ten character varying(255) NOT NULL
);


ALTER TABLE public.quocgia OWNER TO ytdpuser;

--
-- Name: quocgia_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.quocgia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quocgia_id_seq OWNER TO ytdpuser;

--
-- Name: quocgia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.quocgia_id_seq OWNED BY public.quocgia.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.role (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    name character varying(80),
    description character varying(255)
);


ALTER TABLE public.role OWNER TO ytdpuser;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO ytdpuser;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: roles_users; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.roles_users (
    user_id integer,
    role_id integer
);


ALTER TABLE public.roles_users OWNER TO ytdpuser;

--
-- Name: tinhthanh; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public.tinhthanh (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    ma character varying(255),
    ten character varying(255) NOT NULL,
    quocgia_id integer
);


ALTER TABLE public.tinhthanh OWNER TO ytdpuser;

--
-- Name: tinhthanh_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.tinhthanh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tinhthanh_id_seq OWNER TO ytdpuser;

--
-- Name: tinhthanh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.tinhthanh_id_seq OWNED BY public.tinhthanh.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: ytdpuser
--

CREATE TABLE public."user" (
    _created_at timestamp without time zone,
    _updated_at timestamp without time zone,
    _deleted boolean,
    _deleted_at timestamp without time zone,
    _etag character varying(40),
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    first_name character varying(120),
    last_name character varying(120),
    active boolean,
    confirmed_at timestamp without time zone,
    last_login_at timestamp without time zone,
    current_login_at timestamp without time zone,
    last_login_ip character varying(255),
    current_login_ip character varying(255),
    login_count integer,
    birthday timestamp without time zone,
    gender character varying(255),
    phone character varying(31),
    donvi_id integer,
    cuakhau_id integer
);


ALTER TABLE public."user" OWNER TO ytdpuser;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: ytdpuser
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO ytdpuser;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ytdpuser
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: baiviet id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baiviet ALTER COLUMN id SET DEFAULT nextval('public.baiviet_id_seq'::regclass);


--
-- Name: bangdaotaocanbo id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangdaotaocanbo ALTER COLUMN id SET DEFAULT nextval('public.bangdaotaocanbo_id_seq'::regclass);


--
-- Name: bangdichbenh id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangdichbenh ALTER COLUMN id SET DEFAULT nextval('public.bangdichbenh_id_seq'::regclass);


--
-- Name: banghanghoa id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.banghanghoa ALTER COLUMN id SET DEFAULT nextval('public.banghanghoa_id_seq'::regclass);


--
-- Name: banghoptacquocte id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.banghoptacquocte ALTER COLUMN id SET DEFAULT nextval('public.banghoptacquocte_id_seq'::regclass);


--
-- Name: bangkinhphi id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangkinhphi ALTER COLUMN id SET DEFAULT nextval('public.bangkinhphi_id_seq'::regclass);


--
-- Name: bangnghiencuukhoahoc id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangnghiencuukhoahoc ALTER COLUMN id SET DEFAULT nextval('public.bangnghiencuukhoahoc_id_seq'::regclass);


--
-- Name: bangnguoi id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangnguoi ALTER COLUMN id SET DEFAULT nextval('public.bangnguoi_id_seq'::regclass);


--
-- Name: bangphuongtien id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangphuongtien ALTER COLUMN id SET DEFAULT nextval('public.bangphuongtien_id_seq'::regclass);


--
-- Name: bangthithe id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangthithe ALTER COLUMN id SET DEFAULT nextval('public.bangthithe_id_seq'::regclass);


--
-- Name: bangtiemchung id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtiemchung ALTER COLUMN id SET DEFAULT nextval('public.bangtiemchung_id_seq'::regclass);


--
-- Name: bangtrinhdochuyenmon id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtrinhdochuyenmon ALTER COLUMN id SET DEFAULT nextval('public.bangtrinhdochuyenmon_id_seq'::regclass);


--
-- Name: bangtruyenthong id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtruyenthong ALTER COLUMN id SET DEFAULT nextval('public.bangtruyenthong_id_seq'::regclass);


--
-- Name: bangviencanbo id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangviencanbo ALTER COLUMN id SET DEFAULT nextval('public.bangviencanbo_id_seq'::regclass);


--
-- Name: bangvienhoatdongchung id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangvienhoatdongchung ALTER COLUMN id SET DEFAULT nextval('public.bangvienhoatdongchung_id_seq'::regclass);


--
-- Name: bangviensukien id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangviensukien ALTER COLUMN id SET DEFAULT nextval('public.bangviensukien_id_seq'::regclass);


--
-- Name: bangvssh id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangvssh ALTER COLUMN id SET DEFAULT nextval('public.bangvssh_id_seq'::regclass);


--
-- Name: bangxetnghiem id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangxetnghiem ALTER COLUMN id SET DEFAULT nextval('public.bangxetnghiem_id_seq'::regclass);


--
-- Name: baocao id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocao ALTER COLUMN id SET DEFAULT nextval('public.baocao_id_seq'::regclass);


--
-- Name: baocaonghingonhiembenh id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenh ALTER COLUMN id SET DEFAULT nextval('public.baocaonghingonhiembenh_id_seq'::regclass);


--
-- Name: baocaonghingonhiembenhnguoitiepxuc id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhnguoitiepxuc ALTER COLUMN id SET DEFAULT nextval('public.baocaonghingonhiembenhnguoitiepxuc_id_seq'::regclass);


--
-- Name: baocaonghingonhiembenhquocgia id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhquocgia ALTER COLUMN id SET DEFAULT nextval('public.baocaonghingonhiembenhquocgia_id_seq'::regclass);


--
-- Name: baocaonghingonhiembenhvacxin id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhvacxin ALTER COLUMN id SET DEFAULT nextval('public.baocaonghingonhiembenhvacxin_id_seq'::regclass);


--
-- Name: baocaonghingonhiembenhxetnghiem id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhxetnghiem ALTER COLUMN id SET DEFAULT nextval('public.baocaonghingonhiembenhxetnghiem_id_seq'::regclass);


--
-- Name: baocaotonghopnghingonhiembenhnhoma id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaotonghopnghingonhiembenhnhoma ALTER COLUMN id SET DEFAULT nextval('public.baocaotonghopnghingonhiembenhnhoma_id_seq'::regclass);


--
-- Name: baocaovien id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaovien ALTER COLUMN id SET DEFAULT nextval('public.baocaovien_id_seq'::regclass);


--
-- Name: benh id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.benh ALTER COLUMN id SET DEFAULT nextval('public.benh_id_seq'::regclass);


--
-- Name: cuakhau id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.cuakhau ALTER COLUMN id SET DEFAULT nextval('public.cuakhau_id_seq'::regclass);


--
-- Name: danhsachnghingonhiembenhnhoma id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.danhsachnghingonhiembenhnhoma ALTER COLUMN id SET DEFAULT nextval('public.danhsachnghingonhiembenhnhoma_id_seq'::regclass);


--
-- Name: donvi id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.donvi ALTER COLUMN id SET DEFAULT nextval('public.donvi_id_seq'::regclass);


--
-- Name: faq id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.faq ALTER COLUMN id SET DEFAULT nextval('public.faq_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: quanhuyen id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.quanhuyen ALTER COLUMN id SET DEFAULT nextval('public.quanhuyen_id_seq'::regclass);


--
-- Name: quocgia id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.quocgia ALTER COLUMN id SET DEFAULT nextval('public.quocgia_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: tinhthanh id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.tinhthanh ALTER COLUMN id SET DEFAULT nextval('public.tinhthanh_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: baiviet; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baiviet (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ngaytao, tieude, gioithieu, noidung, phamvi) FROM stdin;
\.


--
-- Data for Name: bangdaotaocanbo; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangdaotaocanbo (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, hinhthucdaotao, soluong, vesinhdichte, ytecongdong, xetnghiem, ngoaingu, khac) FROM stdin;
\.


--
-- Data for Name: bangdichbenh; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangdichbenh (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, cuakhau_id, tencuakhau, macuakhau, sothutu, db_csbc, db_dvdtc, db_dvkd, db_mdc, db_mdm, db_sldtc, db_slgs, db_sxdtc, db_sxkd, db_mdc_slgs, db_mdc_slxl, db_csbc_slgs, db_csbc_slxl, db_mdm_slgs, db_mdm_slxl, db_csdv_slgs, db_csdv_sld, db_cssx_slgs, db_cssx_sld) FROM stdin;
\.


--
-- Data for Name: banghanghoa; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.banghanghoa (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, cuakhau_id, tencuakhau, macuakhau, sothutu, hh_nc_bpbk_sl, hh_nc_bpbk_skt, hh_nc_bpbk_sxl, hh_nc_hhk_tl, hh_nc_hhk_skt, hh_nc_hhk_sxl, hh_nc_ghichu, hh_xc_bpbk_sl, hh_xc_bpbk_skt, hh_xc_bpbk_sxl, hh_xc_hhk_tl, hh_xc_hhk_skt, hh_xc_hhk_sxl, hh_xc_ghichu, hh_qc_bpbk_sl, hh_qc_bpbk_skt, hh_qc_bpbk_sxl, hh_qc_hhk_tl, hh_qc_hhk_skt, hh_qc_hhk_sxl, hh_qc_ghichu) FROM stdin;
\.


--
-- Data for Name: banghoptacquocte; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.banghoptacquocte (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, quocgia, noidung) FROM stdin;
\.


--
-- Data for Name: bangkinhphi; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangkinhphi (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, nguonkinhphi, kinhphi) FROM stdin;
\.


--
-- Data for Name: bangnghiencuukhoahoc; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangnghiencuukhoahoc (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, tendetai, thoigianthuchien, detaicap, linhvucnghiencuu) FROM stdin;
\.


--
-- Data for Name: bangnguoi; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangnguoi (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, cuakhau_id, tencuakhau, macuakhau, sothutu, ng_nc_sl1, ng_nc_sl2, ng_nc_ts1, ng_nc_ts2, ng_nc_ghichu, ng_xc_sl1, ng_xc_sl2, ng_xc_ts1, ng_xc_ts2, ng_xc_ghichu, ng_qc_sl1, ng_qc_sl2, ng_qc_ts1, ng_qc_ts2, ng_qc_ghichu) FROM stdin;
\.


--
-- Data for Name: bangphuongtien; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangphuongtien (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, cuakhau_id, tencuakhau, macuakhau, sothutu, pt_nc_hk_sl, pt_nc_hk_skt, pt_nc_hk_sxl, pt_nc_db_sl, pt_nc_db_skt, pt_nc_db_sxl, pt_nc_dt_sl, pt_nc_dt_skt, pt_nc_dt_sxl, pt_nc_ghichu, pt_xc_ghichu, pt_qc_ghichu, pt_nc_ds_sl, pt_nc_ds_skt, pt_nc_ds_sxl, pt_xc_hk_sl, pt_xc_hk_skt, pt_xc_hk_sxl, pt_xc_db_sl, pt_xc_db_skt, pt_xc_db_sxl, pt_xc_dt_sl, pt_xc_dt_skt, pt_xc_dt_sxl, pt_xc_ds_sl, pt_xc_ds_skt, pt_xc_ds_sxl, pt_qc_hk_sl, pt_qc_hk_skt, pt_qc_hk_sxl, pt_qc_db_sl, pt_qc_db_skt, pt_qc_db_sxl, pt_qc_dt_sl, pt_qc_dt_skt, pt_qc_dt_sxl, pt_qc_ds_sl, pt_qc_ds_skt, pt_qc_ds_sxl) FROM stdin;
\.


--
-- Data for Name: bangthithe; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangthithe (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, cuakhau_id, tencuakhau, macuakhau, sothutu, tt_nc_tt_sl, tt_nc_tt_skt, tt_nc_tt_sxl, tt_nc_hc_sl, tt_nc_hc_skt, tt_nc_hc_sxl, tt_nc_tc_sl, tt_nc_tc_skt, tt_nc_tc_sxl, tt_xc_tt_sl, tt_xc_tt_skt, tt_xc_tt_sxl, tt_xc_hc_sl, tt_xc_hc_skt, tt_xc_hc_sxl, tt_xc_tc_sl, tt_xc_tc_skt, tt_xc_tc_sxl, tt_qc_tt_sl, tt_qc_tt_skt, tt_qc_tt_sxl, tt_qc_hc_sl, tt_qc_hc_skt, tt_qc_hc_sxl, tt_qc_tc_sl, tt_qc_tc_skt, tt_qc_tc_sxl, tt_nc_ghichu, tt_xc_ghichu, tt_qc_ghichu) FROM stdin;
\.


--
-- Data for Name: bangtiemchung; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangtiemchung (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, tenbenh, tenvacxin, soluong, ghichu) FROM stdin;
\.


--
-- Data for Name: bangtrinhdochuyenmon; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangtrinhdochuyenmon (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, tenbophan, y_tiensy, y_thacsy, y_cunhan, y_ysy, y_dieuduong, y_kythuatvien, y_khac, duoc_daihoc, duoc_trunghoc, duoc_duocta, nganhkhac_daihoc, nganhkhac_trunghoc, nganhkhac_khac) FROM stdin;
\.


--
-- Data for Name: bangtruyenthong; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangtruyenthong (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, hinhthuc, noidung, doituong, ketqua) FROM stdin;
\.


--
-- Data for Name: bangviencanbo; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangviencanbo (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, trinhdochuyenmon, soluongchuyentrach, soluongkiemnhiem) FROM stdin;
\.


--
-- Data for Name: bangvienhoatdongchung; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangvienhoatdongchung (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, noidung, sothutu, tenhoatdong, soluong) FROM stdin;
\.


--
-- Data for Name: bangviensukien; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangviensukien (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, tensukien, diadiem, bienphap, ketqua) FROM stdin;
\.


--
-- Data for Name: bangvssh; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangvssh (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, cuakhau_id, tencuakhau, macuakhau, sothutu, vssh_nc_vs_sl, vssh_nc_vs_skt, vssh_nc_vs_sxl, vssh_nc_sh_sl, vssh_nc_sh_skt, vssh_nc_sh_sxl, vssh_nc_mo_sl, vssh_nc_mo_skt, vssh_nc_mo_sxl, vssh_xc_vs_sl, vssh_xc_vs_skt, vssh_xc_vs_sxl, vssh_xc_sh_sl, vssh_xc_sh_skt, vssh_xc_sh_sxl, vssh_xc_mo_sl, vssh_xc_mo_skt, vssh_xc_mo_sxl, vssh_qc_vs_sl, vssh_qc_vs_skt, vssh_qc_vs_sxl, vssh_qc_sh_sl, vssh_qc_sh_skt, vssh_qc_sh_sxl, vssh_qc_mo_sl, vssh_qc_mo_skt, vssh_qc_mo_sxl, vssh_nc_ghichu, vssh_xc_ghichu, vssh_qc_ghichu) FROM stdin;
\.


--
-- Data for Name: bangxetnghiem; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.bangxetnghiem (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, sothutu, loaixetnghiem, soluongmau, dattieuchuan, ghichu) FROM stdin;
\.


--
-- Data for Name: baocao; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocao (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ngaybaocao, loaikybaocao, loaibaocao, kybaocao, nambaocao, tungay, denngay, donvi_id, cuakhau_id, nhanxetnguoi, nhanxetphuongtien, nhanxethanghoa, nhanxetthithe, nhanxetvssh, nhanxet, kiennghi, hoatdongkhac, nhanlucts, nhanlucbienche, nhanluchopdong, tinhtrang) FROM stdin;
\.


--
-- Data for Name: baocaonghingonhiembenh; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocaonghingonhiembenh (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ngaybaocao, noibaocao, nambaocao, donvi_id, hoten, gioitinh, namsinh, quoctich, cmtnd, cuakhau_nhapquacanh, gio_nhapquacanh, ngay_nhapquacanh, phuongtien, sohieu_phuongtien, noio, diachi_lienlac, email, dienthoai, benh_nghingo, tiensu_dichte, tiensu_ngaykhoiphat, tiensu_trieuchunglamsang, tiensu_chandoan, tiensu_xutri, noitiepnhan_xutri, nhanxet_danhgia, tinhtrang) FROM stdin;
\.


--
-- Data for Name: baocaonghingonhiembenhnguoitiepxuc; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocaonghingonhiembenhnguoitiepxuc (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, hoten, quoctich, cmtnd, dienthoai, email) FROM stdin;
\.


--
-- Data for Name: baocaonghingonhiembenhquocgia; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocaonghingonhiembenhquocgia (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, tenquocgia, ngaydiqua) FROM stdin;
\.


--
-- Data for Name: baocaonghingonhiembenhvacxin; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocaonghingonhiembenhvacxin (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, tenvacxin, solandung, ngaydunggannhat, ketqua) FROM stdin;
\.


--
-- Data for Name: baocaonghingonhiembenhxetnghiem; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocaonghingonhiembenhxetnghiem (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, baocao_id, loaimauxetnghiem, ngaylay, ketqua) FROM stdin;
\.


--
-- Data for Name: baocaotonghopnghingonhiembenhnhoma; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocaotonghopnghingonhiembenhnhoma (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ngaybaocao, donvi_id, tendonvi, cuakhau_id, tencuakhau, macuakhau, sohanhkhach, sochuyenbay) FROM stdin;
2020-02-04 11:40:36.072686	2020-02-04 11:46:09.189477	f	\N	7c690a0c-4708-11ea-a10b-34de1a1b76fa	1	1580774400	1	Cục YTDP	\N	\N	\N	1	\N
2020-02-04 14:55:34.941817	2020-02-04 14:55:34.941817	f	\N	b97a1fc4-4723-11ea-a10b-34de1a1b76fa	3	1580835600	4	Y te du phong tinh Lang Son	2	Cua khau tinh Lạng Son	\N	241	\N
2020-02-04 14:54:58.868805	2020-02-04 15:00:46.80095	f	\N	a3f9ed0a-4723-11ea-a10b-34de1a1b76fa	2	1580774400	4	Y te du phong tinh Lang Son	2	Cua khau tinh Lạng Son	\N	11	\N
\.


--
-- Data for Name: baocaovien; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.baocaovien (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ngaybaocao, kybaocao, nambaocao, tungay, denngay, donvi_id, danhgia, kiennghivien, kiennghidonvi, tinhtrang) FROM stdin;
\.


--
-- Data for Name: benh; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.benh (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ten) FROM stdin;
\.


--
-- Data for Name: cuakhau; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.cuakhau (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ten, kiemdichyte, phongcachly, nguoilienlac, sodienthoai, diachi, email, donvi_id, tinhthanh_id, thutu, duongboquocte, duongbochinh, duongbophu, duongsat, duonghangkhong, duongthuyloai1, duongthuyloai2, quocgia_tiepgiap, cuakhau_tiepgiap) FROM stdin;
2020-02-04 14:04:00.992674	2020-02-04 14:04:00.992674	f	\N	8556988c-471c-11ea-a10b-34de1a1b76fa	1	\N	Cửa khẩu lạng sơn 	t	t	\N	0987098709	\N	\N	\N	\N	\N	f	t	f	t	f	f	f	Trung Quốc	\N
2020-02-04 14:51:34.476443	2020-02-04 14:51:34.476443	f	\N	2a2726dc-4723-11ea-a10b-34de1a1b76fa	3	\N	Cua khau Lang Son 2	t	t	\N	\N	\N	\N	4	\N	\N	f	t	t	t	f	t	f	Trung Quốc	\N
2020-02-04 14:51:59.605356	2020-02-04 14:51:59.605356	f	\N	3920ede4-4723-11ea-a10b-34de1a1b76fa	4	\N	Cua Khau Hai Phong	t	t	\N	\N	\N	\N	4	\N	\N	t	f	t	t	f	t	f	Trung Quốc	\N
2020-02-04 14:52:41.951211	2020-02-04 14:52:41.951211	f	\N	525ea44a-4723-11ea-a10b-34de1a1b76fa	5	\N	Cua Khau Lao Cai	t	t	\N	\N	\N	\N	4	\N	\N	f	t	f	t	t	t	t	Trung Quốc	\N
2020-02-04 14:46:36.321084	2020-02-04 14:53:38.681253	f	\N	786fb9c2-4722-11ea-a10b-34de1a1b76fa	2	\N	Cua khau tinh Lạng Son	t	f	\N	132	\N	\N	4	\N	\N	f	t	f	t	f	f	f	Trung Quốc	\N
\.


--
-- Data for Name: danhsachnghingonhiembenhnhoma; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.danhsachnghingonhiembenhnhoma (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, sothutu, hoten, namsinh, gioitinh, noiden, quoctich, ngaygio_phathien, tinhtrang, huongxuly, baocao_id) FROM stdin;
2020-02-04 11:40:36.072686	2020-02-04 11:46:09.189477	f	\N	7c690a0d-4708-11ea-a10b-34de1a1b76fa	1	1	1	\N	\N	\N	\N	\N	\N	\N	1
2020-02-04 11:40:36.072686	2020-02-04 11:46:09.189477	f	\N	7c690a0e-4708-11ea-a10b-34de1a1b76fa	2	2	2	\N	\N	\N	\N	\N	\N	\N	1
2020-02-04 14:55:34.941817	2020-02-04 14:55:34.941817	f	\N	b97a1fc5-4723-11ea-a10b-34de1a1b76fa	4	1	\N	1223	Nam	Viet Nam	\N	\N	\N	\N	3
2020-02-04 14:54:58.868805	2020-02-04 15:00:46.80095	f	\N	a3f9ed0b-4723-11ea-a10b-34de1a1b76fa	3	1	chinh1	1997	12	Ha Nam	Viet Nam	\N	\N	\N	2
2020-02-04 14:56:14.160055	2020-02-04 15:00:46.80095	f	\N	d0dc772a-4723-11ea-a10b-34de1a1b76fa	5	2	chinh2	3	12	\N	\N	\N	\N	\N	2
\.


--
-- Data for Name: donvi; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.donvi (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ten, sodienthoai, diachi, email, ghichu, vungmien, tinhthanh_id, tuyendonvi, coquanchuquan, parent_id, loaidonvi, giamdoc, sdtgiamdoc, emailgiamdoc, phogiamdoc, sdtphogiamdoc, emailphogiamdoc) FROM stdin;
2020-02-04 14:04:52.839604	2020-02-04 14:04:52.839604	f	\N	a43dcf9a-471c-11ea-a10b-34de1a1b76fa	2	\N	Đơn vị tỉnh Lạng Sơn	\N	\N	\N	\N	\N	\N	3	\N	\N	20	\N	\N	\N	\N	\N	\N
2020-02-04 14:10:30.315761	2020-02-04 14:10:30.315761	f	\N	6d649890-471d-11ea-a10b-34de1a1b76fa	3	\N	Y te du phong tinh Lang Son	\N	\N	\N	\N	\N	\N	1	\N	\N	10	\N	\N	\N	\N	\N	\N
2020-02-04 11:40:15.840046	2020-02-04 14:40:02.877927	f	\N	70596e50-4708-11ea-a10b-34de1a1b76fa	1	\N	Cục YTDP	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	\N	\N
2020-02-04 14:23:03.31813	2020-02-04 14:53:38.681253	f	\N	2e379fb2-471f-11ea-a10b-34de1a1b76fa	4	\N	Y te du phong tinh Lang Son	\N	\N	\N	\N	\N	\N	3	\N	1	20	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: faq; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.faq (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, tieude, noidung) FROM stdin;
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.permission (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, role_id, model, canread, cancreate, canupdate, candelete, cancreateown, canupdateown, candeleteown) FROM stdin;
\.


--
-- Data for Name: quanhuyen; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.quanhuyen (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ten, tinhthanh_id) FROM stdin;
\.


--
-- Data for Name: quocgia; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.quocgia (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ten) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.role (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, name, description) FROM stdin;
2020-02-04 11:40:15.840046	2020-02-04 11:40:15.840046	f	\N	70596e51-4708-11ea-a10b-34de1a1b76fa	1	Admin	\N
2020-02-04 11:40:15.840046	2020-02-04 11:40:15.840046	f	\N	70596e52-4708-11ea-a10b-34de1a1b76fa	2	VienAdmin	\N
2020-02-04 11:40:15.840046	2020-02-04 11:40:15.840046	f	\N	70596e56-4708-11ea-a10b-34de1a1b76fa	6	CuaKhauUser	\N
2020-02-04 11:40:15.840046	2020-02-04 14:23:53.095585	f	\N	70596e53-4708-11ea-a10b-34de1a1b76fa	3	VienUser	\N
2020-02-04 11:40:15.840046	2020-02-04 14:44:56.762972	f	\N	70596e54-4708-11ea-a10b-34de1a1b76fa	4	DonViAdmin	\N
2020-02-04 11:40:15.840046	2020-02-04 14:53:38.681253	f	\N	70596e55-4708-11ea-a10b-34de1a1b76fa	5	DonViUser	\N
\.


--
-- Data for Name: roles_users; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.roles_users (user_id, role_id) FROM stdin;
1	1
2	4
3	4
4	5
\.


--
-- Data for Name: tinhthanh; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public.tinhthanh (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, ma, ten, quocgia_id) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: ytdpuser
--

COPY public."user" (_created_at, _updated_at, _deleted, _deleted_at, _etag, id, name, email, password, first_name, last_name, active, confirmed_at, last_login_at, current_login_at, last_login_ip, current_login_ip, login_count, birthday, gender, phone, donvi_id, cuakhau_id) FROM stdin;
2020-02-04 11:40:15.840046	2020-02-04 11:40:15.840046	f	\N	70596e57-4708-11ea-a10b-34de1a1b76fa	1	Admin	admin	$6$rounds=656000$1lYKRXvdzY6tw4H9$.6OMs.Jfb8VNi9ZwEZ85HRwLTz8ocJ78oXBOoZHXlLhWF7k6n72WsAakTym0ZkcfGPJ3YIjpnPAw/NaDxZtcu1	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N
2020-02-04 14:23:53.095585	2020-02-04 14:40:02.877927	f	\N	4be6fdbe-471f-11ea-a10b-34de1a1b76fa	2	Nguyễn Văn Chính	chinhnv	$6$rounds=656000$lXtCK6ECxIjDQrg.$zWZ262ioQglciR/t0ThVYDqxUKdnKA3nLLEXCJSUOfGNNgLG1po0ZnPXoVWjoH/ArURh1FyJshzj9weJtrunE0	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N
2020-02-04 14:44:56.762972	2020-02-04 14:44:56.762972	f	\N	3d19dace-4722-11ea-a10b-34de1a1b76fa	3	NGuyễn Văn Kiên	kien	$6$rounds=656000$mN28gBC5Mn1qX62r$MPXTAACubxxZ5Iw0MozxAz08pcrl8sRBH.fWPycl.6.QUjadEUadIiD7zFdet4G9bV4o/1indVDlTtWGyXFtG0	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	4	\N
2020-02-04 14:53:31.328016	2020-02-04 14:53:38.681253	f	\N	6fd00da2-4723-11ea-a10b-34de1a1b76fa	4	Nguyen Van Hung 1	hung1	$6$rounds=656000$073FHuIueOOmY/AT$eS7PZa5hp2nBvFk3SAU6ROVZ.jkUTu83OvdBPmfmUAiGHz3HWrQoXzH7trap2IZXdi2oYiShLWMYnVo7rtmWj0	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	4	2
\.


--
-- Name: baiviet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baiviet_id_seq', 1, false);


--
-- Name: bangdaotaocanbo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangdaotaocanbo_id_seq', 1, false);


--
-- Name: bangdichbenh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangdichbenh_id_seq', 1, false);


--
-- Name: banghanghoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.banghanghoa_id_seq', 1, false);


--
-- Name: banghoptacquocte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.banghoptacquocte_id_seq', 1, false);


--
-- Name: bangkinhphi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangkinhphi_id_seq', 1, false);


--
-- Name: bangnghiencuukhoahoc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangnghiencuukhoahoc_id_seq', 1, false);


--
-- Name: bangnguoi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangnguoi_id_seq', 1, false);


--
-- Name: bangphuongtien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangphuongtien_id_seq', 1, false);


--
-- Name: bangthithe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangthithe_id_seq', 1, false);


--
-- Name: bangtiemchung_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangtiemchung_id_seq', 1, false);


--
-- Name: bangtrinhdochuyenmon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangtrinhdochuyenmon_id_seq', 1, false);


--
-- Name: bangtruyenthong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangtruyenthong_id_seq', 1, false);


--
-- Name: bangviencanbo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangviencanbo_id_seq', 1, false);


--
-- Name: bangvienhoatdongchung_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangvienhoatdongchung_id_seq', 1, false);


--
-- Name: bangviensukien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangviensukien_id_seq', 1, false);


--
-- Name: bangvssh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangvssh_id_seq', 1, false);


--
-- Name: bangxetnghiem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.bangxetnghiem_id_seq', 1, false);


--
-- Name: baocao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocao_id_seq', 1, false);


--
-- Name: baocaonghingonhiembenh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocaonghingonhiembenh_id_seq', 1, false);


--
-- Name: baocaonghingonhiembenhnguoitiepxuc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocaonghingonhiembenhnguoitiepxuc_id_seq', 1, false);


--
-- Name: baocaonghingonhiembenhquocgia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocaonghingonhiembenhquocgia_id_seq', 1, false);


--
-- Name: baocaonghingonhiembenhvacxin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocaonghingonhiembenhvacxin_id_seq', 1, false);


--
-- Name: baocaonghingonhiembenhxetnghiem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocaonghingonhiembenhxetnghiem_id_seq', 1, false);


--
-- Name: baocaotonghopnghingonhiembenhnhoma_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocaotonghopnghingonhiembenhnhoma_id_seq', 3, true);


--
-- Name: baocaovien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.baocaovien_id_seq', 1, false);


--
-- Name: benh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.benh_id_seq', 1, false);


--
-- Name: cuakhau_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.cuakhau_id_seq', 5, true);


--
-- Name: danhsachnghingonhiembenhnhoma_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.danhsachnghingonhiembenhnhoma_id_seq', 5, true);


--
-- Name: donvi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.donvi_id_seq', 4, true);


--
-- Name: faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.faq_id_seq', 1, false);


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.permission_id_seq', 1, false);


--
-- Name: quanhuyen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.quanhuyen_id_seq', 1, false);


--
-- Name: quocgia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.quocgia_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: tinhthanh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.tinhthanh_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ytdpuser
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: baiviet baiviet_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baiviet
    ADD CONSTRAINT baiviet_pkey PRIMARY KEY (id);


--
-- Name: bangdaotaocanbo bangdaotaocanbo_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangdaotaocanbo
    ADD CONSTRAINT bangdaotaocanbo_pkey PRIMARY KEY (id);


--
-- Name: bangdichbenh bangdichbenh_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangdichbenh
    ADD CONSTRAINT bangdichbenh_pkey PRIMARY KEY (id);


--
-- Name: banghanghoa banghanghoa_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.banghanghoa
    ADD CONSTRAINT banghanghoa_pkey PRIMARY KEY (id);


--
-- Name: banghoptacquocte banghoptacquocte_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.banghoptacquocte
    ADD CONSTRAINT banghoptacquocte_pkey PRIMARY KEY (id);


--
-- Name: bangkinhphi bangkinhphi_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangkinhphi
    ADD CONSTRAINT bangkinhphi_pkey PRIMARY KEY (id);


--
-- Name: bangnghiencuukhoahoc bangnghiencuukhoahoc_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangnghiencuukhoahoc
    ADD CONSTRAINT bangnghiencuukhoahoc_pkey PRIMARY KEY (id);


--
-- Name: bangnguoi bangnguoi_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangnguoi
    ADD CONSTRAINT bangnguoi_pkey PRIMARY KEY (id);


--
-- Name: bangphuongtien bangphuongtien_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangphuongtien
    ADD CONSTRAINT bangphuongtien_pkey PRIMARY KEY (id);


--
-- Name: bangthithe bangthithe_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangthithe
    ADD CONSTRAINT bangthithe_pkey PRIMARY KEY (id);


--
-- Name: bangtiemchung bangtiemchung_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtiemchung
    ADD CONSTRAINT bangtiemchung_pkey PRIMARY KEY (id);


--
-- Name: bangtrinhdochuyenmon bangtrinhdochuyenmon_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtrinhdochuyenmon
    ADD CONSTRAINT bangtrinhdochuyenmon_pkey PRIMARY KEY (id);


--
-- Name: bangtruyenthong bangtruyenthong_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtruyenthong
    ADD CONSTRAINT bangtruyenthong_pkey PRIMARY KEY (id);


--
-- Name: bangviencanbo bangviencanbo_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangviencanbo
    ADD CONSTRAINT bangviencanbo_pkey PRIMARY KEY (id);


--
-- Name: bangvienhoatdongchung bangvienhoatdongchung_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangvienhoatdongchung
    ADD CONSTRAINT bangvienhoatdongchung_pkey PRIMARY KEY (id);


--
-- Name: bangviensukien bangviensukien_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangviensukien
    ADD CONSTRAINT bangviensukien_pkey PRIMARY KEY (id);


--
-- Name: bangvssh bangvssh_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangvssh
    ADD CONSTRAINT bangvssh_pkey PRIMARY KEY (id);


--
-- Name: bangxetnghiem bangxetnghiem_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangxetnghiem
    ADD CONSTRAINT bangxetnghiem_pkey PRIMARY KEY (id);


--
-- Name: baocao baocao_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocao
    ADD CONSTRAINT baocao_pkey PRIMARY KEY (id);


--
-- Name: baocaonghingonhiembenh baocaonghingonhiembenh_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenh
    ADD CONSTRAINT baocaonghingonhiembenh_pkey PRIMARY KEY (id);


--
-- Name: baocaonghingonhiembenhnguoitiepxuc baocaonghingonhiembenhnguoitiepxuc_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhnguoitiepxuc
    ADD CONSTRAINT baocaonghingonhiembenhnguoitiepxuc_pkey PRIMARY KEY (id);


--
-- Name: baocaonghingonhiembenhquocgia baocaonghingonhiembenhquocgia_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhquocgia
    ADD CONSTRAINT baocaonghingonhiembenhquocgia_pkey PRIMARY KEY (id);


--
-- Name: baocaonghingonhiembenhvacxin baocaonghingonhiembenhvacxin_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhvacxin
    ADD CONSTRAINT baocaonghingonhiembenhvacxin_pkey PRIMARY KEY (id);


--
-- Name: baocaonghingonhiembenhxetnghiem baocaonghingonhiembenhxetnghiem_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhxetnghiem
    ADD CONSTRAINT baocaonghingonhiembenhxetnghiem_pkey PRIMARY KEY (id);


--
-- Name: baocaotonghopnghingonhiembenhnhoma baocaotonghopnghingonhiembenhnhoma_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaotonghopnghingonhiembenhnhoma
    ADD CONSTRAINT baocaotonghopnghingonhiembenhnhoma_pkey PRIMARY KEY (id);


--
-- Name: baocaovien baocaovien_ma_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaovien
    ADD CONSTRAINT baocaovien_ma_key UNIQUE (ma);


--
-- Name: baocaovien baocaovien_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaovien
    ADD CONSTRAINT baocaovien_pkey PRIMARY KEY (id);


--
-- Name: benh benh_ma_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.benh
    ADD CONSTRAINT benh_ma_key UNIQUE (ma);


--
-- Name: benh benh_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.benh
    ADD CONSTRAINT benh_pkey PRIMARY KEY (id);


--
-- Name: cuakhau cuakhau_ma_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.cuakhau
    ADD CONSTRAINT cuakhau_ma_key UNIQUE (ma);


--
-- Name: cuakhau cuakhau_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.cuakhau
    ADD CONSTRAINT cuakhau_pkey PRIMARY KEY (id);


--
-- Name: danhsachnghingonhiembenhnhoma danhsachnghingonhiembenhnhoma_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.danhsachnghingonhiembenhnhoma
    ADD CONSTRAINT danhsachnghingonhiembenhnhoma_pkey PRIMARY KEY (id);


--
-- Name: donvi donvi_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.donvi
    ADD CONSTRAINT donvi_pkey PRIMARY KEY (id);


--
-- Name: faq faq_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT faq_pkey PRIMARY KEY (id);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: quanhuyen quanhuyen_ma_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.quanhuyen
    ADD CONSTRAINT quanhuyen_ma_key UNIQUE (ma);


--
-- Name: quanhuyen quanhuyen_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.quanhuyen
    ADD CONSTRAINT quanhuyen_pkey PRIMARY KEY (id);


--
-- Name: quocgia quocgia_ma_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.quocgia
    ADD CONSTRAINT quocgia_ma_key UNIQUE (ma);


--
-- Name: quocgia quocgia_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.quocgia
    ADD CONSTRAINT quocgia_pkey PRIMARY KEY (id);


--
-- Name: role role_name_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_name_key UNIQUE (name);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: tinhthanh tinhthanh_ma_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.tinhthanh
    ADD CONSTRAINT tinhthanh_ma_key UNIQUE (ma);


--
-- Name: tinhthanh tinhthanh_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.tinhthanh
    ADD CONSTRAINT tinhthanh_pkey PRIMARY KEY (id);


--
-- Name: baocaotonghopnghingonhiembenhnhoma uq_baocaotonghopnghingonhiembenhnhoma_donvi_id_cuakhau_id_ngayb; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaotonghopnghingonhiembenhnhoma
    ADD CONSTRAINT uq_baocaotonghopnghingonhiembenhnhoma_donvi_id_cuakhau_id_ngayb UNIQUE (donvi_id, cuakhau_id, ngaybaocao);


--
-- Name: baocaovien uq_baocaovien_donvi_id_ma; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaovien
    ADD CONSTRAINT uq_baocaovien_donvi_id_ma UNIQUE (donvi_id, ma);


--
-- Name: permission uq_permission_rolename_modelname; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT uq_permission_rolename_modelname UNIQUE (role_id, model);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: baocao_uq_idx; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE UNIQUE INDEX baocao_uq_idx ON public.baocao USING btree (loaikybaocao, loaibaocao, kybaocao, nambaocao, donvi_id, cuakhau_id);


--
-- Name: baocao_uq_idx2; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE UNIQUE INDEX baocao_uq_idx2 ON public.baocao USING btree (loaikybaocao, loaibaocao, kybaocao, nambaocao, donvi_id) WHERE (cuakhau_id IS NULL);


--
-- Name: ix_baiviet__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baiviet__etag ON public.baiviet USING btree (_etag);


--
-- Name: ix_bangdaotaocanbo__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangdaotaocanbo__etag ON public.bangdaotaocanbo USING btree (_etag);


--
-- Name: ix_bangdichbenh__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangdichbenh__etag ON public.bangdichbenh USING btree (_etag);


--
-- Name: ix_banghanghoa__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_banghanghoa__etag ON public.banghanghoa USING btree (_etag);


--
-- Name: ix_banghoptacquocte__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_banghoptacquocte__etag ON public.banghoptacquocte USING btree (_etag);


--
-- Name: ix_bangkinhphi__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangkinhphi__etag ON public.bangkinhphi USING btree (_etag);


--
-- Name: ix_bangnghiencuukhoahoc__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangnghiencuukhoahoc__etag ON public.bangnghiencuukhoahoc USING btree (_etag);


--
-- Name: ix_bangnguoi__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangnguoi__etag ON public.bangnguoi USING btree (_etag);


--
-- Name: ix_bangphuongtien__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangphuongtien__etag ON public.bangphuongtien USING btree (_etag);


--
-- Name: ix_bangthithe__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangthithe__etag ON public.bangthithe USING btree (_etag);


--
-- Name: ix_bangtiemchung__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangtiemchung__etag ON public.bangtiemchung USING btree (_etag);


--
-- Name: ix_bangtrinhdochuyenmon__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangtrinhdochuyenmon__etag ON public.bangtrinhdochuyenmon USING btree (_etag);


--
-- Name: ix_bangtruyenthong__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangtruyenthong__etag ON public.bangtruyenthong USING btree (_etag);


--
-- Name: ix_bangviencanbo__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangviencanbo__etag ON public.bangviencanbo USING btree (_etag);


--
-- Name: ix_bangvienhoatdongchung__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangvienhoatdongchung__etag ON public.bangvienhoatdongchung USING btree (_etag);


--
-- Name: ix_bangviensukien__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangviensukien__etag ON public.bangviensukien USING btree (_etag);


--
-- Name: ix_bangvssh__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangvssh__etag ON public.bangvssh USING btree (_etag);


--
-- Name: ix_bangxetnghiem__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_bangxetnghiem__etag ON public.bangxetnghiem USING btree (_etag);


--
-- Name: ix_baocao__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocao__etag ON public.baocao USING btree (_etag);


--
-- Name: ix_baocaonghingonhiembenh__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocaonghingonhiembenh__etag ON public.baocaonghingonhiembenh USING btree (_etag);


--
-- Name: ix_baocaonghingonhiembenhnguoitiepxuc__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocaonghingonhiembenhnguoitiepxuc__etag ON public.baocaonghingonhiembenhnguoitiepxuc USING btree (_etag);


--
-- Name: ix_baocaonghingonhiembenhquocgia__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocaonghingonhiembenhquocgia__etag ON public.baocaonghingonhiembenhquocgia USING btree (_etag);


--
-- Name: ix_baocaonghingonhiembenhvacxin__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocaonghingonhiembenhvacxin__etag ON public.baocaonghingonhiembenhvacxin USING btree (_etag);


--
-- Name: ix_baocaonghingonhiembenhxetnghiem__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocaonghingonhiembenhxetnghiem__etag ON public.baocaonghingonhiembenhxetnghiem USING btree (_etag);


--
-- Name: ix_baocaotonghopnghingonhiembenhnhoma__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocaotonghopnghingonhiembenhnhoma__etag ON public.baocaotonghopnghingonhiembenhnhoma USING btree (_etag);


--
-- Name: ix_baocaovien__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_baocaovien__etag ON public.baocaovien USING btree (_etag);


--
-- Name: ix_benh__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_benh__etag ON public.benh USING btree (_etag);


--
-- Name: ix_cuakhau__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_cuakhau__etag ON public.cuakhau USING btree (_etag);


--
-- Name: ix_danhsachnghingonhiembenhnhoma__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_danhsachnghingonhiembenhnhoma__etag ON public.danhsachnghingonhiembenhnhoma USING btree (_etag);


--
-- Name: ix_donvi__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_donvi__etag ON public.donvi USING btree (_etag);


--
-- Name: ix_faq__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_faq__etag ON public.faq USING btree (_etag);


--
-- Name: ix_permission__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission__etag ON public.permission USING btree (_etag);


--
-- Name: ix_permission_cancreate; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_cancreate ON public.permission USING btree (cancreate);


--
-- Name: ix_permission_cancreateown; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_cancreateown ON public.permission USING btree (cancreateown);


--
-- Name: ix_permission_candelete; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_candelete ON public.permission USING btree (candelete);


--
-- Name: ix_permission_candeleteown; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_candeleteown ON public.permission USING btree (candeleteown);


--
-- Name: ix_permission_canread; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_canread ON public.permission USING btree (canread);


--
-- Name: ix_permission_canupdate; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_canupdate ON public.permission USING btree (canupdate);


--
-- Name: ix_permission_canupdateown; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_canupdateown ON public.permission USING btree (canupdateown);


--
-- Name: ix_permission_model; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_permission_model ON public.permission USING btree (model);


--
-- Name: ix_quanhuyen__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_quanhuyen__etag ON public.quanhuyen USING btree (_etag);


--
-- Name: ix_quocgia__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_quocgia__etag ON public.quocgia USING btree (_etag);


--
-- Name: ix_role__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_role__etag ON public.role USING btree (_etag);


--
-- Name: ix_tinhthanh__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_tinhthanh__etag ON public.tinhthanh USING btree (_etag);


--
-- Name: ix_user__etag; Type: INDEX; Schema: public; Owner: ytdpuser
--

CREATE INDEX ix_user__etag ON public."user" USING btree (_etag);


--
-- Name: bangdaotaocanbo bangdaotaocanbo_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangdaotaocanbo
    ADD CONSTRAINT bangdaotaocanbo_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangdichbenh bangdichbenh_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangdichbenh
    ADD CONSTRAINT bangdichbenh_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangdichbenh bangdichbenh_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangdichbenh
    ADD CONSTRAINT bangdichbenh_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: banghanghoa banghanghoa_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.banghanghoa
    ADD CONSTRAINT banghanghoa_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: banghanghoa banghanghoa_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.banghanghoa
    ADD CONSTRAINT banghanghoa_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: banghoptacquocte banghoptacquocte_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.banghoptacquocte
    ADD CONSTRAINT banghoptacquocte_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangkinhphi bangkinhphi_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangkinhphi
    ADD CONSTRAINT bangkinhphi_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangnghiencuukhoahoc bangnghiencuukhoahoc_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangnghiencuukhoahoc
    ADD CONSTRAINT bangnghiencuukhoahoc_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangnguoi bangnguoi_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangnguoi
    ADD CONSTRAINT bangnguoi_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangnguoi bangnguoi_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangnguoi
    ADD CONSTRAINT bangnguoi_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: bangphuongtien bangphuongtien_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangphuongtien
    ADD CONSTRAINT bangphuongtien_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangphuongtien bangphuongtien_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangphuongtien
    ADD CONSTRAINT bangphuongtien_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: bangthithe bangthithe_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangthithe
    ADD CONSTRAINT bangthithe_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangthithe bangthithe_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangthithe
    ADD CONSTRAINT bangthithe_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: bangtiemchung bangtiemchung_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtiemchung
    ADD CONSTRAINT bangtiemchung_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangtrinhdochuyenmon bangtrinhdochuyenmon_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtrinhdochuyenmon
    ADD CONSTRAINT bangtrinhdochuyenmon_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangtruyenthong bangtruyenthong_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangtruyenthong
    ADD CONSTRAINT bangtruyenthong_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangviencanbo bangviencanbo_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangviencanbo
    ADD CONSTRAINT bangviencanbo_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaovien(id);


--
-- Name: bangvienhoatdongchung bangvienhoatdongchung_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangvienhoatdongchung
    ADD CONSTRAINT bangvienhoatdongchung_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaovien(id);


--
-- Name: bangviensukien bangviensukien_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangviensukien
    ADD CONSTRAINT bangviensukien_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaovien(id);


--
-- Name: bangvssh bangvssh_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangvssh
    ADD CONSTRAINT bangvssh_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: bangvssh bangvssh_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangvssh
    ADD CONSTRAINT bangvssh_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: bangxetnghiem bangxetnghiem_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.bangxetnghiem
    ADD CONSTRAINT bangxetnghiem_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocao(id);


--
-- Name: baocao baocao_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocao
    ADD CONSTRAINT baocao_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: baocao baocao_donvi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocao
    ADD CONSTRAINT baocao_donvi_id_fkey FOREIGN KEY (donvi_id) REFERENCES public.donvi(id);


--
-- Name: baocaonghingonhiembenh baocaonghingonhiembenh_donvi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenh
    ADD CONSTRAINT baocaonghingonhiembenh_donvi_id_fkey FOREIGN KEY (donvi_id) REFERENCES public.donvi(id);


--
-- Name: baocaonghingonhiembenhnguoitiepxuc baocaonghingonhiembenhnguoitiepxuc_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhnguoitiepxuc
    ADD CONSTRAINT baocaonghingonhiembenhnguoitiepxuc_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaonghingonhiembenh(id);


--
-- Name: baocaonghingonhiembenhquocgia baocaonghingonhiembenhquocgia_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhquocgia
    ADD CONSTRAINT baocaonghingonhiembenhquocgia_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaonghingonhiembenh(id);


--
-- Name: baocaonghingonhiembenhvacxin baocaonghingonhiembenhvacxin_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhvacxin
    ADD CONSTRAINT baocaonghingonhiembenhvacxin_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaonghingonhiembenh(id);


--
-- Name: baocaonghingonhiembenhxetnghiem baocaonghingonhiembenhxetnghiem_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaonghingonhiembenhxetnghiem
    ADD CONSTRAINT baocaonghingonhiembenhxetnghiem_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaonghingonhiembenh(id);


--
-- Name: baocaotonghopnghingonhiembenhnhoma baocaotonghopnghingonhiembenhnhoma_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaotonghopnghingonhiembenhnhoma
    ADD CONSTRAINT baocaotonghopnghingonhiembenhnhoma_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: baocaotonghopnghingonhiembenhnhoma baocaotonghopnghingonhiembenhnhoma_donvi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaotonghopnghingonhiembenhnhoma
    ADD CONSTRAINT baocaotonghopnghingonhiembenhnhoma_donvi_id_fkey FOREIGN KEY (donvi_id) REFERENCES public.donvi(id);


--
-- Name: baocaovien baocaovien_donvi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.baocaovien
    ADD CONSTRAINT baocaovien_donvi_id_fkey FOREIGN KEY (donvi_id) REFERENCES public.donvi(id);


--
-- Name: cuakhau cuakhau_donvi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.cuakhau
    ADD CONSTRAINT cuakhau_donvi_id_fkey FOREIGN KEY (donvi_id) REFERENCES public.donvi(id);


--
-- Name: cuakhau cuakhau_tinhthanh_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.cuakhau
    ADD CONSTRAINT cuakhau_tinhthanh_id_fkey FOREIGN KEY (tinhthanh_id) REFERENCES public.tinhthanh(id);


--
-- Name: danhsachnghingonhiembenhnhoma danhsachnghingonhiembenhnhoma_baocao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.danhsachnghingonhiembenhnhoma
    ADD CONSTRAINT danhsachnghingonhiembenhnhoma_baocao_id_fkey FOREIGN KEY (baocao_id) REFERENCES public.baocaotonghopnghingonhiembenhnhoma(id);


--
-- Name: donvi donvi_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.donvi
    ADD CONSTRAINT donvi_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.donvi(id);


--
-- Name: donvi donvi_tinhthanh_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.donvi
    ADD CONSTRAINT donvi_tinhthanh_id_fkey FOREIGN KEY (tinhthanh_id) REFERENCES public.tinhthanh(id);


--
-- Name: permission permission_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: quanhuyen quanhuyen_tinhthanh_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.quanhuyen
    ADD CONSTRAINT quanhuyen_tinhthanh_id_fkey FOREIGN KEY (tinhthanh_id) REFERENCES public.tinhthanh(id);


--
-- Name: roles_users roles_users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.roles_users
    ADD CONSTRAINT roles_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: roles_users roles_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.roles_users
    ADD CONSTRAINT roles_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: tinhthanh tinhthanh_quocgia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public.tinhthanh
    ADD CONSTRAINT tinhthanh_quocgia_id_fkey FOREIGN KEY (quocgia_id) REFERENCES public.quocgia(id);


--
-- Name: user user_cuakhau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_cuakhau_id_fkey FOREIGN KEY (cuakhau_id) REFERENCES public.cuakhau(id);


--
-- Name: user user_donvi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ytdpuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_donvi_id_fkey FOREIGN KEY (donvi_id) REFERENCES public.donvi(id);


--
-- PostgreSQL database dump complete
--

